import type { Recipe, CreateRecipeDto } from '../types/recipe';

export interface RecipeApi {
    createRecipe(dto: CreateRecipeDto): Promise<Recipe>;
}