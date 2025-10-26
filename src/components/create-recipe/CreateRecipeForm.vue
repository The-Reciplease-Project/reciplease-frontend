<template>
    <form @submit.prevent="submitRecipe">
        <RecipeNameField @update:model-value="childRecipeName => recipeName = childRecipeName"
          :required=true
          :length=recipeName.length
          />
      
    </form>

    <section>
      
      <RecipeItemList :items="items['ingredients']" recipe-item-type="ingredients" @remove="removeAt"  />
      <RecipeItemSelect category-were-searching-in="ingredients" :selected-ids="selectedIds('ingredients')" @add-item="add"/>
      
      <RecipeItemList :items="items['cookware']" recipe-item-type="cookware" @remove="removeAt"  />
      <RecipeItemSelect category-were-searching-in="cookware" :selected-ids="selectedIds('cookware')" @add-item="add"/>
      
      <RecipeItemList :items="items['appliances']" recipe-item-type="appliances" @remove="removeAt"/>
      <RecipeItemSelect category-were-searching-in="appliances" :selected-ids="selectedIds('appliances')" @add-item="add"/>
      
      <RecipeTimer :time="time" @startedTimer="startTimer" @stoppedTimer="stopTimer" @resetTimer="resetTimer" />
      <RecipeSteps 
      :steps="steps" 
      :time="time" 
      @started-step="(i) => startStep(i,time)" 
      @ended-step="(i) => endStep(i,time)" 
      @added-step="() => addStep()"
      @input-something="(i) => changeDescStepField(i)"
      />
    </section>
    <button class="thing" @click="submitRecipe" :disabled="isSubmitting"> Save Recipe </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import '@/assets/main.css';
import RecipeNameField from './RecipeNameField.vue';
import RecipeSteps from './RecipeSteps.vue';
import RecipeItemSelect from './RecipeItemSelect.vue';
import RecipeItemList from './RecipeItemList.vue';
import { useRecipeItemSelector, type Category } from '@/composables/create-recipe/useIngredients';
import { useRecipeService } from '@/services/recipe.service';
import RecipeTimer from './RecipeTimer.vue';
import { useTimer} from '@/composables/create-recipe/useTimer';
import { useRecipeSteps } from '@/composables/create-recipe/useIngredientSteps';

const { time, startTimer, stopTimer, resetTimer } = useTimer();
const { addStep, steps, startStep, endStep, changeDescStepField  } = useRecipeSteps();
const recipeName = ref<string>('');
const isSubmitting = ref<boolean>(false);
const { items, add, removeAt, clear } = useRecipeItemSelector();
const selectedIds = (category: Category) => new Set(items.value[category].map(i => i.name))

defineEmits<({ event: 'timerStarted', time: number })>();
import { useAuth0Service } from '@/services/auth0.service';
  const { getToken } = useAuth0Service()

  onMounted(() => {
  getToken()

});


async function submitRecipe() {
  const { createRecipe } = useRecipeService();

  let token = await getToken();
  if (!recipeName.value.trim()) return 
  isSubmitting.value = true
  try {
    const dto = { name: recipeName.value.trim(), ingredients: items.value['ingredients'], cookware: items.value['cookware'], appliances: items.value['appliances'],  steps: steps.value }
    const saved = await createRecipe(dto, token)
  } catch (err) {
    console.error('Failed to create recipe', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>

</style>