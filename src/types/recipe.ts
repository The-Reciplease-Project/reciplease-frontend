export type Recipe = {
  name: string
  ingredients: Ingredient[]
  cookwares?: Cookware[]
  utensils?: Utensil[]
  appliances?: Appliance[]
  steps: Step[]
}

export type Ingredient = {
  name: string
  quantity: number
  unit?: string // e.g., "g", "cup", "tbsp"
  // Potentially add: alternatives?: Ingredient[]
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

export type Step = {
  id: number
  description: string
  estimatedTime: number
  subSteps: SubStep[]
}

export type SubStep = {
  description: string
  time: number
  // Consider making time a duration type (e.g., ISO 8601) if not plain int
}

// request
export type CreateRecipeDto = {
  name: string
  ingredients: string[]
}
