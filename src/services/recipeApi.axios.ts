import axios from 'axios'
import type { Recipe } from '../types/recipe'
import type { CreateRecipeDto } from '../types/recipeDto'
import type { RecipeApi } from './recipeApi.types'

const API_BASE = import.meta.env.VITE_API_SERVER_URL as string
type TokenProvider = () => Promise<string>

export class AxiosRecipeApi implements RecipeApi {
  constructor(private getToken: TokenProvider, private http = axios) {}

  async createRecipe(dto: CreateRecipeDto): Promise<Recipe> {
    const token = await this.getToken() 
    const res = await this.http.post<Recipe>(`${API_BASE}/recipes`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  }

  async getIngredients(): Promise<string[]> {
    const token = await this.getToken()
    const res = await this.http.get<any[]>(`${API_BASE}/ingredients`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  }
}

