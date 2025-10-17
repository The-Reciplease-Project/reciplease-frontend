export type Recipe = {
  name: string
  ingredients: IngredientExport[]
}

export type RecipeStepExport = {
  id?: string  
  description: string;
  startTime: number | null;
  endTime: number | null;
  recipe: number
}

export type IngredientImport = {
  id: string,
  name: string
}

export type IngredientExport = {
  id: string
  name: string
  quantity?: number
  unit?: string // e.g., "g", "cup", "tbsp"
}

export type StepImport = {

}

export type Cookware = {
  name: string
  size?: string // e.g., "10 in", "3 qt"
  // Potentially add: alternatives?: Cookware[]
}

export type Appliance = {
  name: string
  // Potentially add: alternatives?: Appliance[]
}

export type Utensil = {
  name: string
  // Placeholder for utensil details if needed later
}



export type SubStep = {
  description: string
  time: number
  // Consider making time a duration type (e.g., ISO 8601) if not plain int
}


