import { useAuth0 } from '@auth0/auth0-vue'

export function useAuth0Service() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  const API_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE
  const CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID

  async function getToken(): Promise<string | undefined> {
    if(!isAuthenticated.value) return undefined

    const accessToken = await getAccessTokenSilently({
      authorizationParams: { 
        audience: API_AUDIENCE,
        client_secret: 'N67nYma3AKwTuJX-UFkwsT396eVYO1ShQuCH63hm2BYZ6j-IO93D0iN05E3uOHfK',
        client_id: CLIENT_ID,
        grant_type: 'client_credentials',
         },
    })
    return accessToken;
  }

  return { getToken }
}
