import type { Recipe } from '../types/recipe';
import type { CreateRecipeDto } from '../types/recipeDto';

export interface RecipeApi {
    createRecipe(dto: CreateRecipeDto): Promise<Recipe>;
}