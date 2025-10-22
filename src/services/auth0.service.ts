import { ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export function useAuth0Service() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const token = ref<string | undefined>()
  const API_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE

  async function getToken() {
    if (isAuthenticated.value) {
      token.value = await getAccessTokenSilently({
        authorizationParams: { audience: API_AUDIENCE },
      })
    }
  }

  return { token, getToken }
}
