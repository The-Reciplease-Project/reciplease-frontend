import { ref } from 'vue'
import { useRecipeSteps } from './useIngredientSteps'

const { steps } = useRecipeSteps()

export function useTimer() {
  
  const time = ref(0)
  const timeIsRunning = ref(false)
  // Works in both browser and Node type environments:
  const intervalId = ref<ReturnType<typeof setInterval> | null>(null)
  

  function startTimer() {
    if (intervalId.value) return // already running
    timeIsRunning.value = true
    intervalId.value = setInterval(() => {
      time.value += 1
    }, 1000)
  }

  function stopTimer() {
    timeIsRunning.value = false
    if (intervalId.value) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }

  function resetTimer() {
    stopTimer()
    time.value = 0
    for (const step of steps.value) {
      step.startTime = 0
      step.endTime = 0
    }
  }

  function convertTimeFromSeconds(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const hoursStr = String(hours).padStart(2, '0')
  const minutesStr = String(minutes).padStart(2, '0')
  const secondsStr = String(seconds).padStart(2, '0')

  return `${hoursStr}:${minutesStr}:${secondsStr}`
}

  

  return {
    time,
    timeIsRunning,
    startTimer,
    stopTimer,
    resetTimer,
    convertTimeFromSeconds
  }
}
