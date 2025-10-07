<template>
    <p>Select Ingredient:</p>


    <div class="ingredient-picker">
        <ul v-if="ingredients.length">
            <li v-for="(ingredient, i) in ingredients" :key="i">
                {{ ingredient }}
                <input type="checkbox" :value="ingredient" >
            </li>
        </ul>
    </div>


    <ul v-if="selectedIngredients.length">
            <li v-for="(ingredient, i) in selectedIngredients" :key="i">
                {{  ingredient }}
            </li>
        </ul>   
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '@/assets/recipeadder.css';
const ingredients = ref<string[]>([]);
const selectedIngredients = ref<string[]>([]);
const open = ref(false);

function selectIngredient(ingredient: string)
{
    if(!selectedIngredients.value.includes(ingredient)){
        selectedIngredients.value.push(ingredient);
    }
}

function removeIngredient(index: number){
    selectedIngredients.value.splice(index, 1);
}

</script>

<style scoped>
</style>
