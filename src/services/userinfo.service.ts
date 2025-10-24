// src/services/userinfo.service.ts
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";
import { useAuth0Service } from '@/services/auth0.service'
import type { UserInfo } from '../types/user';

export function useUserInfo() {
  const { isAuthenticated } = useAuth0();
  const { getToken } = useAuth0Service()

  const AUTH0_DOMAIN   = import.meta.env.VITE_AUTH0_DOMAIN;     // e.g. dev-xxx.us.auth0.com
  const API_BASE       = import.meta.env.VITE_API_SERVER_URL;   // e.g. http://localhost:5000

  const auth0Client = axios.create({ baseURL: `https://${AUTH0_DOMAIN}` });

  // We have to get User Info because we need to sub aka Sub Id used to verify the user is in our backend
  async function getUserInfo(): Promise<{ profile: UserInfo }> {
  // wait up to 5 s total, checking every 500 ms
  const maxWait = 5000
  const interval = 500
  const start = Date.now()

  while (!isAuthenticated.value) {
    if (Date.now() - start > maxWait) {
      throw new Error("Not authenticated (timeout)")
    }
    await new Promise(r => setTimeout(r, interval))
  }

  const token = await getToken()
  if (!token) throw new Error("Missing token")

  const res = await auth0Client.get<UserInfo>("/userinfo", {
    headers: { Authorization: `Bearer ${token}` }
  })

  console.log(res.data.sub);

  return { profile: res.data }
}

  async function ensureUserInBackend(): Promise<void> {
    if (!isAuthenticated.value) throw new Error("Not authenticated");

    const { profile } = await getUserInfo();
    const token = await getToken();

    try {
      const found = await axios.get<{ id: string }>(
        `${API_BASE}/users/by-sub/${encodeURIComponent(profile.sub)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Exists -> update
      await axios.put(
        `${API_BASE}/users/${found.data.id}`,
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err: any) {
      if (err?.response?.status === 404) {
        // Not found -> create
        await axios.post(
          `${API_BASE}/users`,
          profile,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        throw err;
      }
    }
  }

  return { getUserInfo, ensureUserInBackend };
}
