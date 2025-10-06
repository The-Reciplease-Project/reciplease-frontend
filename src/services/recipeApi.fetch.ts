// src/services/recipeApi.fetch.ts
import type { Recipe, CreateRecipeDto } from '@/types/recipe'
import type { RecipeApi } from './recipeApi.types'

const API_BASE = import.meta.env.VITE_API_SERVER_URL as string

export type TokenProvider = () => Promise<string>

export function createFetchRecipeApi(getToken: TokenProvider): RecipeApi {
  return {
    async createRecipe(dto: CreateRecipeDto): Promise<Recipe> {
      const token = await getToken() // ✅ no useAuth0 here
      const res = await fetch(`${API_BASE}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`)
      }

      return (await res.json()) as Recipe
    },
  }
}
