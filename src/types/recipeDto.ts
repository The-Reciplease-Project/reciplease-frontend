import type { RecipeItemExport, RecipeStepExport} from "./recipe";

export type CreateRecipeDto = {
    name: string;
    ingredients: RecipeItemExport[];
    cookware: RecipeItemExport[];
    appliances: RecipeItemExport[];
    steps: RecipeStepExport[];
}


