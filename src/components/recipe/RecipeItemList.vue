<template>
  <h3>{{ recipeItemType }}</h3>
  <div>
    <ul v-if="props.items.length">
      <li v-for="(item, index) in props.items" :key="item.id">
        {{ item.name }}
        <button type="button" @click="emit('remove', index, recipeItemType)">
          Remove {{ recipeItemType }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { RecipeItemExport } from '@/types/recipe'
import type { Category } from  '@/composables/useIngredients';
const emit = defineEmits<{ (event: 'remove', index: number, category: Category): void }>()
const props = defineProps<{
  items: RecipeItemExport[]
  recipeItemType: Category
}>()
</script>
