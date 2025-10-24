<template>
    <form @submit.prevent="submitRecipe">
        <RecipeNameField @update:model-value="childRecipeName => recipeName = childRecipeName"/>
      
    </form>

    <section>
      <RecipeItemSelect category-were-searching-in="ingredients" :selected-ids="selectedIds('ingredients')" @add-item="add"/>
      <RecipeItemList :items="items['ingredients']" recipe-item-type="ingredients" @remove="removeAt"  />
      <RecipeItemSelect category-were-searching-in="cookware" :selected-ids="selectedIds('cookware')" @add-item="add"/>
      <RecipeItemList :items="items['cookware']" recipe-item-type="cookware" @remove="removeAt"  />
      <RecipeItemSelect category-were-searching-in="appliances" :selected-ids="selectedIds('appliances')" @add-item="add"/>
      <RecipeItemList :items="items['appliances']" recipe-item-type="appliances" @remove="removeAt"/>
      <RecipeTimer :time="time" @startedTimer="startTimer" @stoppedTimer="stopTimer" @resetTimer="resetTimer" />
      <RecipeSteps :steps="steps" :time="time" @started-step="(i) => startStep(i,time)" @ended-step="(i) => endStep(i,time)" @added-step="() => addStep()"/>
    </section>
    <button class="thing" @click="submitRecipe" :disabled="isSubmitting"> Save Recipe </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '@/assets/main.css';
import RecipeNameField from './recipe/RecipeNameField.vue';
import RecipeSteps from '../components/recipe/RecipeSteps.vue';
import RecipeItemSelect from './recipe/RecipeItemSelect.vue';
import RecipeItemList from './recipe/RecipeItemList.vue';
import { useRecipeItemSelector, type Category } from '@/composables/useIngredients';
import { useRecipeService } from '@/services/recipe.service';
import RecipeTimer from '../components/recipe/RecipeTimer.vue';
import { useTimer} from '@/composables/useTimer';
import { useRecipeSteps } from '@/composables/useIngredientSteps';

const { time, startTimer, stopTimer, resetTimer } = useTimer();
const { addStep, steps, startStep, endStep } = useRecipeSteps();
const { createRecipe } = useRecipeService();
const recipeName = ref<string>('');
const isSubmitting = ref<boolean>(false);
const { items, add, removeAt, clear } = useRecipeItemSelector();
const selectedIds = (category: Category) => new Set(items.value[category].map(i => i.name))

defineEmits<({ event: 'timerStarted', time: number })>();


async function submitRecipe() {
  if (!recipeName.value.trim()) return 
  isSubmitting.value = true
  try {
    const dto = { name: recipeName.value.trim(), ingredients: items.value['ingredients'], cookware: items.value['cookware'], appliances: items.value['appliances'],  steps: steps.value }
    const saved = await createRecipe(dto)
  } catch (err) {
    console.error('Failed to create recipe', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>

</style>