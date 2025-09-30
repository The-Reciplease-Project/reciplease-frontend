<template>
    <div>
        
        <!-- Going to add the below stuff into individual components, I'd say -->
        <p> Recipe Name </p>
        <input v-model="recipe.name" placeholder="Enter recipe name"></input>


        <p> Ingredients</p>
        <input v-model="ingredient" @keyup.enter="addIngredient" placeholder="Enter ingredient"></input>
        <button @click="addIngredient">Add Ingredient</button>
        
        <!-- aDD UL-->
         <!-- Is there any way we can introduce event delegation here with the Remove Ingredient button?-->
          <!-- Need to know which child element was interacted with using event.target-->
         <ul v-if="ingredients.length" >
            <li v-for="(ing, i) in ingredients" :key="i" >
                {{  ing  }}
                <button @click="removeIngredient(i)">Remove Ingredient</button>
            </li>
         </ul>

         <button @click="submitRecipe">Save Recipe</button>
    </div>

    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Recipe } from '@/types/recipe';
import { useRecipeApi } from '@/services/recipe.service';
const { createRecipe } = useRecipeApi();

const recipe = ref<Recipe>({
  name: '',
  ingredients: [],
  steps: [],
});

const ingredient = ref<string>('');
const ingredients = ref<string[]>([]);


function addIngredient(){
    const value = ingredient.value.trim();
    if(!value) return;
    ingredients.value.push(value);
    ingredient.value = '';}

function removeIngredient(index: number){
    ingredients.value.splice(index, 1);
}


async function submitRecipe() {
  try {
    const dto = {
      name: recipe.value.name,
      ingredients: ingredients.value,
    }
    const saved = await createRecipe(dto)
    console.log('Saved recipe:', saved)
  } catch (err) {
    console.error('Failed to create recipe', err)
  }
}


</script>

<style lang="scss" scoped>

</style>