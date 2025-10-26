import { useAuth0 } from '@auth0/auth0-vue'

export function useAuth0Service() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  async function getToken(): Promise<string | undefined> {
    if(!isAuthenticated.value) return undefined

    const accessToken = await getAccessTokenSilently()
    return accessToken;
  }

  return { getToken }
}
