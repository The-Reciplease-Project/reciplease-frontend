// src/services/userinfo.service.ts
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";
import type { UserInfo, RateLimit } from '../types/user';


export function useUserInfo() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const AUTH0_DOMAIN   = import.meta.env.VITE_AUTH0_DOMAIN;     // e.g. dev-xxx.us.auth0.com
  const API_BASE       = import.meta.env.VITE_API_SERVER_URL;   // e.g. http://localhost:5000
  const API_AUDIENCE   = import.meta.env.VITE_AUTH0_AUDIENCE;   // your API identifier in Auth0

  const auth0Client = axios.create({ baseURL: `https://${AUTH0_DOMAIN}` });

  // 1) Get OIDC user profile (sub/email/name...) from Auth0
  async function getUserInfo(): Promise<{ profile: UserInfo; rateLimit: RateLimit }> {
    if (!isAuthenticated.value) throw new Error("Not authenticated");

    // Ask for an OIDC access token (NO audience) for /userinfo
    const tokenResp = await getAccessTokenSilently({
      detailedResponse: true,
      authorizationParams: {
        scope: "openid profile email",
        // audience: undefined // uncomment if you globally set an audience and /userinfo 401s
      },
    }) as any;

    const accessToken: string = typeof tokenResp === "string" ? tokenResp : tokenResp.access_token;

    const res = await auth0Client.get<UserInfo>("/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const rateLimit: RateLimit = {
      limit:     res.headers["x-ratelimit-limit"]     ? Number(res.headers["x-ratelimit-limit"])     : undefined,
      remaining: res.headers["x-ratelimit-remaining"] ? Number(res.headers["x-ratelimit-remaining"]) : undefined,
      reset:     res.headers["x-ratelimit-reset"]     ? Number(res.headers["x-ratelimit-reset"])     : undefined,
    };

    return { profile: res.data, rateLimit };
  }

  // 2) Ensure user exists in YOUR backend by sub (no composite keys)
  // Requires these backend endpoints:
  //   GET    /users/by-sub/{sub}  -> { id: "<guid>" } or 404
  //   POST   /users               -> body: UserInfo (creates)
  //   PUT    /users/{id}          -> body: UserInfo (updates)
  async function ensureUserInBackend(): Promise<void> {
    if (!isAuthenticated.value) throw new Error("Not authenticated");

    const { profile } = await getUserInfo();

    // API token (WITH audience) to call your backend
    const apiToken = await getAccessTokenSilently({
      authorizationParams: { audience: API_AUDIENCE }
    });

    // Try resolve GUID by sub
    try {
      const found = await axios.get<{ id: string }>(
        `${API_BASE}/users/by-sub/${encodeURIComponent(profile.sub)}`,
        { headers: { Authorization: `Bearer ${apiToken}` } }
      );

      // Exists -> update
      await axios.put(
        `${API_BASE}/users/${found.data.id}`,
        profile,
        { headers: { Authorization: `Bearer ${apiToken}` } }
      );
    } catch (err: any) {
      if (err?.response?.status === 404) {
        // Not found -> create
        await axios.post(
          `${API_BASE}/users`,
          profile,
          { headers: { Authorization: `Bearer ${apiToken}` } }
        );
      } else {
        throw err;
      }
    }
  }

  return { getUserInfo, ensureUserInBackend };
}
