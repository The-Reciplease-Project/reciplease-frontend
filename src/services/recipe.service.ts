// src/services/recipe.service.ts
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";
import type { Recipe, CreateRecipeDto } from "../types/recipe";

const API_BASE = import.meta.env.VITE_API_SERVER_URL as string;

export function useRecipeApi() {
  const { getAccessTokenSilently } = useAuth0();

  async function createRecipe(dto: CreateRecipeDto): Promise<Recipe> {
    // get a valid API token
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });

    const res = await axios.post<Recipe>(`${API_BASE}/recipes`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }

  return { createRecipe };
}
