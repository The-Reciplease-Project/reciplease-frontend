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

  // async function loadRecipeItems<T>(
  //   scrollTop?: number,
  //   clientHeight?: number,
  //   scrollHeight?: number
  // ){
  //   try{
      
  //   }

  // }

  return { createRecipe }
}

// async function loadIngredients(
//   scrollTop?: number,
//   clientHeight?: number,
//   scrollHeight?: number
// ) {
//   try {
//     let token: string | undefined;
//     if (isAuthenticated.value) {
//       token = await getAccessTokenSilently({
//         authorizationParams: {
//           audience: API_AUDIENCE,
//           scope: 'read:ingredients'
//         }
//       });
//     }

//     if (page.value === 1) {
//       // first page, just load
//       const { data } = await axios.get<IngredientImport[]>(
//   `${API_BASE}/ingredients`,
//   {
//     params: { q: searchTerm.value, page: page.value },     // ✅ let axios encode it
//     headers: { Authorization: token ? `Bearer ${token}` : undefined },
//   }
//       );
//       availableIngredients.value.push(...data);
//       page.value += 1;
//     } else {
//       const nearBottom =
//         typeof scrollTop === 'number' &&
//         typeof clientHeight === 'number' &&
//         typeof scrollHeight === 'number' &&
//         scrollTop + clientHeight >= scrollHeight - 1;

//       if (!nearBottom) return;

//       const { data } = await axios.get<IngredientImport[]>(
//   `${API_BASE}/ingredients`,
//   {
//     params: { q: searchTerm.value, page: page.value },     // let axios encode it
//     headers: { Authorization: token ? `Bearer ${token}` : undefined },
//   }
// )
//         availableIngredients.value.push(...data);
//         page.value += 1;
//     }
//   } catch (e) {
//     console.error('Error fetching ingredients:', e);
//   } finally {
//     // no-op
//   }
// }

