<template>
    <form @submit.prevent="submitRecipe">
        <RecipeNameField 
        @update:model-value="childRecipeName => recipeName = childRecipeName"
        />
    </form>

    <section>
      <h3 class="thing">Ingredients</h3>
      <div class="thing">
        <IngredientSelect @addIngredient="addIngredient" :selectedIds="selectedIds" />
      </div>
      <div class="thing">
        <IngredientList :items="ingredients" @remove="removeIngredient" />
      </div>

      <RecipeTimer 
      :time="time" 
      @startedTimer="startTimer"
      @stoppedTimer="stopTimer"
      @resetTimer="resetTimer" />

      <RecipeSteps
      :steps="steps"
      :time="time"
      @started-step="(i) => startStep(i,time)"
      @ended-step="(i) => endStep(i,time)"
      @added-step="() => addStep()"
      />
    </section>
    <button class="thing" @click="submitRecipe" :disabled="isSubmitting"> Save Recipe </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import '@/assets/main.css';
import RecipeNameField from './recipe/RecipeNameField.vue';
import IngredientList from '../components/recipe/IngredientList.vue';
import IngredientSelect from '../components/recipe/IngredientSelect.vue';
import RecipeSteps from '../components/recipe/RecipeSteps.vue';
import { useIngredients } from '@/composables/useIngredients';
import { useRecipeService } from '@/services/recipe.service';
import RecipeTimer from '../components/recipe/RecipeTimer.vue';
import { useTimer} from '@/composables/useTimer';
import { useIngredientSteps } from '@/composables/useIngredientSteps';

const { time, startTimer, stopTimer, resetTimer } = useTimer();
const { addStep, steps, startStep, endStep } = useIngredientSteps();
const { createRecipe } = useRecipeService();
const recipeName = ref<string>('');
const isSubmitting = ref<boolean>(false);
const { items: ingredients, add: addIngredient, removeAt: removeIngredient, clear } = useIngredients();
const selectedIds = computed(() => new Set(ingredients.value.map(i => i.id)));

defineEmits<({ event: 'timerStarted', time: number })>();

async function submitRecipe() {
  if (!recipeName.value.trim()) return 
  isSubmitting.value = true
  try {
    const dto = { name: recipeName.value.trim(), ingredients: ingredients.value, steps: steps.value }
    const saved = await createRecipe(dto)
    recipeName.value = ''
    clear()
  } catch (err) {
    console.error('Failed to create recipe', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>

</style>