// src/services/recipe.service.ts
import axios from 'axios'
import type { CreateRecipeDto } from '@/types/recipeDto'


export function useRecipeService() {
    
  async function createRecipe(dto: CreateRecipeDto, token: string | undefined) {
    const API_BASE = import.meta.env.VITE_API_SERVER_URL

    const { data } = await axios.post(
      `${API_BASE}/recipes`,
      dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  }

  return { createRecipe }
}

