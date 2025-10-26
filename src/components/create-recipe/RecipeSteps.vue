<template>
  <h3> Recipe Steps </h3>

  <div>
    <ul>
      <ol v-for="(step, index) in steps" :key="index">
        <textarea
          v-model="step.description"
          placeholder="Enter step description"
          @input="emit('inputSomething', index)"
          :maxlength="150"
        ></textarea>

        <small v-if="step.disableDescription">
          Please keep your descriptions concise!
        </small>

        <div v-if="step.beginStep === null">
          <button @click="emit('startedStep', index)">Begin Step</button>
        </div>

        <div v-else>
          <button @click="emit('endedStep', index)">End Step</button>
        </div>

        <p v-if="step.beginStep === null">Not Started</p>
        <p v-else-if="step.beginStep !== null && step.finishStep === null">
          {{ `${convertTimeFromSeconds(step.beginStep)} - ${convertTimeFromSeconds(time)}` }}
        </p>
        <p v-else-if="step.finishStep !== null">
          {{ `${convertTimeFromSeconds(step.beginStep)} - ${convertTimeFromSeconds(step.finishStep)}` }}
        </p>
      </ol>
    </ul>

    <button @click="emit('addedStep')">Add Step</button>
  </div>
</template>

<script setup lang="ts">
import type { RecipeStepExport } from '@/types/recipe'
import { useTimer } from '@/composables/create-recipe/useTimer'

const { convertTimeFromSeconds } = useTimer()
const emit = defineEmits<{
  (e: 'startedStep', index: number): void
  (e: 'inputSomething', index: number): void
  (e: 'endedStep', index: number): void
  (e: 'addedStep'): void
}>()

const props = defineProps<{ steps: RecipeStepExport[]; time: number }>()
</script>

<style scoped>
</style>
