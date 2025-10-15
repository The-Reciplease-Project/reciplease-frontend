export type CreateRecipeDto = {
  name: string
  ingredients: Array<{
    ingredientId: string;   // GUID string
    quantity?: number;      // maps to decimal?
    unit?: string;
  }>
}
