import { ref } from 'vue'  
import type { RecipeStepExport } from '@/types/recipe'

export function useRecipeSteps() {
    const steps = ref<RecipeStepExport[]>([])
    
    function addStep() {
      steps.value.push({
      description: '',
      startTime: null,
      endTime: null,
      recipe: 0,
      disableDescription: false,
    })
  }

  // Optional helpers to mark a step
  function startStep(i: number, time: number) {
    const s = steps.value[i]
    if (!s) return
    s.startTime = time
  }

  function endStep(i: number, time: number) {
    const s = steps.value[i]
    if (!s) return
    s.endTime = time
  }

  function changeDescStepField(i : number) {
    if(steps.value[i].description.length >= 150){
      steps.value[i].disableDescription = true
      return
    }
      steps.value[i].disableDescription = false
    
  }


  return {
    steps,
    addStep,
    startStep,
    endStep,
    changeDescStepField
  }
}