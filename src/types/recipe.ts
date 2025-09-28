export interface Recipe {
  name: string
  ingredients: Ingredient[]
  cookwares?: Cookware[]
  utensils?: Utensil[]
  appliances?: Appliance[]
  steps: Step[]
}

export interface Ingredient {
  name: string
  quantity: number
  unit?: string // e.g., "g", "cup", "tbsp"
  // Potentially add: alternatives?: Ingredient[]
}

export interface Cookware {
  name: string
  size?: string // e.g., "10 in", "3 qt"
  // Potentially add: alternatives?: Cookware[]
}

export interface Appliance {
  name: string
  // Potentially add: alternatives?: Appliance[]
}

export interface Utensil {
  name: string
  // Placeholder for utensil details if needed later
}

export interface Step {
  id: number
  description: string
  estimatedTime: number
  subSteps: SubStep[]
}

export interface SubStep {
  description: string
  time: number
  // Consider making time a duration type (e.g., ISO 8601) if not plain int
}

// request
export interface CreateRecipeDto {
  name: string
  ingredients: string[]
}
