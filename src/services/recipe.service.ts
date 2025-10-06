// src/services/recipe.service.ts
import { useAuth0 } from '@auth0/auth0-vue'
import { AxiosRecipeApi } from './recipeApi.axios'
import { createFetchRecipeApi } from './recipeApi.fetch'
import type { RecipeApi } from './recipeApi.types'

export function useRecipeApi(): RecipeApi {
  const { getAccessTokenSilently } = useAuth0() // ✅ inside setup
  const tokenProvider = () =>
    getAccessTokenSilently({
      authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
    })

  const client = import.meta.env.VITE_API_CLIENT ?? 'axios'
  return client === 'axios'
    ? new AxiosRecipeApi(tokenProvider)
    : createFetchRecipeApi(tokenProvider)
}
