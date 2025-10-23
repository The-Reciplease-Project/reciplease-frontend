<template>
<input
  ref="myInput"
  :placeholder="`Search ${categoryWereSearchingIn}...`"
  v-model="searchTerm"
/>
  <div class="item-picker"
   v-if="isAvailableItemListOpen "
   @scroll.passive="loadRecipeItems(($event.currentTarget as HTMLElement)!.scrollTop, ($event.currentTarget as HTMLElement)!.clientHeight, ($event.currentTarget as HTMLElement)!.scrollHeight)">
  <ul v-if="availableItems.length">
    <li
      v-for="(item, i) in availableItems"
      :key="i"
      @click="emit('addItem', selectedItem = { id: item.id, name: item.name }, categoryWereSearchingIn) ; setInputFocus(); searchTerm = ''"
      class="list"
      :class="{ 'selected-items': props.selectedIds.has(item.id) }"
    >
      {{ item.name }}
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import '@/assets/recipeadder.css';
import { useAuth0Service } from '@/services/auth0.service';
import type { Category } from  '@/composables/useIngredients';

import type { RecipeItemExport, RecipeItemImport } from '@/types/recipe';

const selectedItem = ref<RecipeItemExport | null>(null);
const availableItems = ref<RecipeItemImport[]>([]);
const isAvailableItemListOpen = ref<boolean>(false);
const myInput = ref<HTMLInputElement | null>(null);
const emit = defineEmits<{(event: 'addItem', value: RecipeItemExport, category: Category): void}>();
const props = defineProps<{
  selectedIds: Set<string>,
  categoryWereSearchingIn : Category,
   }>()
const API_BASE = import.meta.env.VITE_API_SERVER_URL;
const page = ref<number>(1);
const searchTerm = ref<string>('');
const { token, getToken } = useAuth0Service()

function setInputFocus() {
  myInput.value?.focus();
}

function toggleIngredientPicker() {
  if(searchTerm.value === ''){
    isAvailableItemListOpen .value = false;
  }
  else {
    isAvailableItemListOpen .value = true;
  }
}

watch(searchTerm, () => {
  toggleIngredientPicker();
  page.value = 1;
  availableItems.value = [];
  loadRecipeItems();
})

onMounted(() => {
  getToken()
  loadRecipeItems();
});

async function loadRecipeItems<T, K>(
    scrollTop?: number,
    clientHeight?: number,
    scrollHeight?: number
  ){
    try {
    
    if (page.value === 1) {
      // first page, just load
      const { data } = await axios.get<RecipeItemImport[]>(
  `${API_BASE}/${props.categoryWereSearchingIn}`,
  {
    params: { q: searchTerm.value, page: page.value },     // ✅ let axios encode it
    headers: { Authorization: token ? `Bearer ${token}` : undefined },
  }
      );
      availableItems.value.push(...data);
      page.value += 1;
    } else {
      const nearBottom =
        typeof scrollTop === 'number' &&
        typeof clientHeight === 'number' &&
        typeof scrollHeight === 'number' &&
        scrollTop + clientHeight >= scrollHeight - 1;

      if (!nearBottom) return;

      const { data } = await axios.get<RecipeItemImport[]>(
  `${API_BASE}/ingredients`,
  {
    params: { q: searchTerm.value, page: page.value },     // ✅ let axios encode it
    headers: { Authorization: token ? `Bearer ${token}` : undefined },
  }
)
        availableItems.value.push(...data);
        page.value += 1;
    }
  } catch (e) {
    console.error('Error fetching ingredients:', e);
  } finally {
    // no-op
  }

  }


</script>
