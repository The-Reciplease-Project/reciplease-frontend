import { ref } from 'vue'  
import type { RecipeStepExport } from '@/types/recipe'

export function useIngredientSteps() {
    const steps = ref<RecipeStepExport[]>([])

    function addStep() {
    steps.value.push({
      description: '',
      startTime: null,
      endTime: null,
      recipe: 0
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

  return {
    steps,
    addStep,
    startStep,
    endStep,
  }
}