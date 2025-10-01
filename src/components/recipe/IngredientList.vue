<template>
    <div>
        <ul v-if="props.items.length">
            <li v-for="(ingredient, index) in items" :key:index>
                {{ ingredient  }}

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

const emit = defineEmits<{(event: 'remove', index: number): void}>(); 
const props = defineProps<{ items: string[] }>(); // RecipeForm.vue parent component is passing down the ingredients array

</script>