<template>
    <form @submit.prevent="submitRecipe">
        <RecipeNameField 
        @update:model-value="childRecipeName => recipeName = childRecipeName"
        />
    </form>

    <section>
        <h3> Ingredients </h3>
        <IngredientSelect @addIngredient="addIngredient"/>
        <IngredientList :items="ingredients" @remove="removeIngredient" />
    </section>

    <button @click="submitRecipe" :disabled="isSubmitting"> Save Recipe </button>
    
</template>

<script setup lang="ts">
import RecipeNameField from './recipe/RecipeNameField.vue';
import IngredientList from '../components/recipe/IngredientList.vue';
import IngredientSelect from '../components/recipe/IngredientSelect.vue';
import { useRecipeApi } from '@/services/recipe.service';
import { useIngredients } from '@/composables/useIngredients';
const { createRecipe } = useRecipeApi();
import { ref } from 'vue';

const recipeName = ref<string>('');
const isSubmitting = ref<boolean>(false); // This will be passed down to child IngredientInput.vue component
const { items: ingredients, add: addIngredient, removeAt: removeIngredient, clear } = useIngredients();

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