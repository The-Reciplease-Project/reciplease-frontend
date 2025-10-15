<template>
    <form @submit.prevent="submitRecipe">
        <RecipeNameField 
        @update:model-value="childRecipeName => recipeName = childRecipeName"
        />
    </form>

    <RecipeSteps />

    <section>

        <h3 class="thing">Ingredients</h3>
<div class="thing">
  <IngredientSelect @addIngredient="addIngredient" :selectedIds="selectedIds" />
</div>
<div class="thing">
  <IngredientList :items="ingredients" @remove="removeIngredient" />
</div>

<h3 class="thing" > Cookware </h3>

<div class="thing">
  <CookwareSelect @addIngredient="addIngredient" :selectedIds="selectedIds" />
</div>

<div class="thing">
  <CookwareList :items="ingredients" @remove="removeIngredient" />
</div>

<h3 class="thing" > Utensils </h3>

<div class="thing">
  <UtensilSelect @addIngredient="addIngredient" :selectedIds="selectedIds" />
</div>

<div class="thing">
  <UtensilList :items="ingredients" @remove="removeIngredient" />
</div>

<h3 class="thing" > Appliances </h3>

<div class="thing">
  <ApplianceSelect @addIngredient="addIngredient" :selectedIds="selectedIds" />
</div>

<div class="thing">
  <ApplianceList :items="ingredients" @remove="removeIngredient" />
</div>



    </section>

    <button class="thing" @click="submitRecipe" :disabled="isSubmitting"> Save Recipe </button>
    
</template>

<script setup lang="ts">
import RecipeNameField from './recipe/RecipeNameField.vue';
import IngredientList from '../components/recipe/IngredientList.vue';
import IngredientSelect from '../components/recipe/IngredientSelect.vue';
import CookwareSelect  from '../components/recipe/CookwareSelect.vue';
import CookwareList from '../components/recipe/CookwareList.vue';
import UtensilSelect  from '../components/recipe/UtensilSelect.vue';
import UtensilList from '../components/recipe/UtensilList.vue';
import ApplianceSelect  from '../components/recipe/ApplianceSelect.vue';
import ApplianceList from '../components/recipe/ApplianceList.vue';
import RecipeSteps from '../components/recipe/RecipeSteps.vue';
import { useIngredients } from '@/composables/useIngredients';
import { useRecipeService } from '@/services/recipe.service';
const { createRecipe } = useRecipeService();
import { ref, computed } from 'vue';
import '@/assets/main.css';

const recipeName = ref<string>('');
const isSubmitting = ref<boolean>(false);
const { items: ingredients, add: addIngredient, removeAt: removeIngredient, clear } = useIngredients();

const selectedIds = computed(() => new Set(ingredients.value.map(i => i.id)));

async function submitRecipe() {
  if (!recipeName.value.trim()) return
  isSubmitting.value = true
  try {
    const dto = { name: recipeName.value.trim(), ingredients: ingredients.value }
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