import type { IngredientExport, StepExport} from "./recipe";

export type CreateRecipeDto = {
    name: string;
    ingredients: IngredientExport[];
    steps: StepExport[];
}


