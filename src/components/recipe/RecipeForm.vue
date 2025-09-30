<template>
    <form @submit.prevent="submitRecipe">
        <RecipeNameField 
        :modelValue="name"
        @update:model-value="val => name = val"
        />
    </form>

    <section>
        <h3> Ingredients </h3>
        <IngredientInput @add="addIngredient" :disabledProp="isSubmitting" />"
        <IngredientList :items="ingredients" @remove="removeIngredient" />
    </section>

    <button :disabled="isSubmitting"> Save Recipe </button>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RecipeNameField from './RecipeNameField.vue'
import IngredientInput from './IngredientInput.vue';
import IngredientList from './IngredientList.vue';
import { useRecipeApi } from '@/services/recipe.service';
import { useIngredients } from '@/composables/useIngredients';
const { createRecipe } = useRecipeApi();

const name = ref<string>('');
const isSubmitting = ref<boolean>(false); // This will be passed down to child IngredientInput.vue component
const { items: ingredients, add: addIngredient, removeAt: removeIngredient, clear } = useIngredients();

async function submitRecipe() {
  if (!name.value.trim()) return
  isSubmitting.value = true
  try {
    const dto = { name: name.value.trim(), ingredients: ingredients.value }
    const saved = await createRecipe(dto)
    console.log('Saved recipe:', saved)
    // optional: reset after save
    name.value = ''
    clear()
  } catch (err) {
    console.error('Failed to create recipe', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>