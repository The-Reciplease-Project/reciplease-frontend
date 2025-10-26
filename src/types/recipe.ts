export type Recipe = {
  name: string
  ingredients: RecipeItemExport[]
}

export type RecipeStepExport = {
  id?: string  
  description: string;
  startTime: number | null;
  endTime: number | null;
  recipe: number
  disableDescription? : boolean
}

export type RecipeItemImport = {
  id: string
  name: string
}

export type RecipeItemExport = {
  id: string
  name: string
  quantity?: number
  unit?: string
}

export type StepImport = {

}



