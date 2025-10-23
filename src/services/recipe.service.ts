// src/services/recipe.service.ts
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-vue'
import type { CreateRecipeDto } from '@/types/recipeDto'

export function useRecipeService() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  const API_BASE     = import.meta.env.VITE_API_SERVER_URL
  const API_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE   

  async function createRecipe(dto: CreateRecipeDto) {
    if (!isAuthenticated.value) {
      throw new Error('Not authenticated')
    }

    const apiToken = await getAccessTokenSilently({
      authorizationParams: { audience: API_AUDIENCE },
    })

    const { data } = await axios.post(
      `${API_BASE}/recipes`,
      dto,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  }

  return { createRecipe }
}

