<template>
    <div>
        <ul v-if="props.items.length">
            <li v-for="(ingredient, index) in items" :key="index">
                {{ ingredient.name }}

                <button 
                type="button"
                aria-label="Remove Ingredient"
                @click="emit('remove', index)">
                Remove Ingredient
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { IngredientExport } from '@/types/recipe';

const emit = defineEmits<{(event: 'remove', index: number): void}>();
const props = defineProps<{ items: IngredientExport[] }>(); // RecipeForm.vue parent component is passing down the ingredients array

</script>