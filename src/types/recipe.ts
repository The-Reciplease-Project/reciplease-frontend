export type Recipe = {
  name: string
  ingredients: RecipeItemExport[]
}

export type RecipeStepExport = {
  id?: string  
  description: string;
  beginStep: number | null;
  finishStep: number | null;
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



