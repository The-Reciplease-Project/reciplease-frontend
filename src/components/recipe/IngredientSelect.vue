<template>
  <input placeholder="Search ingredients..." @click="openIngredientPicker = !openIngredientPicker"></input>
  <div
  class="ingredient-picker"
  v-if="openIngredientPicker"
  @scroll.passive="loadIngredients(
    ($event.currentTarget as HTMLElement)!.scrollTop,
    ($event.currentTarget as HTMLElement)!.clientHeight,
    ($event.currentTarget as HTMLElement)!.scrollHeight
  )"
>
  <ul v-if="availableIngredients.length">
    <li
      v-for="(ingredient, i) in availableIngredients"
      :key="i"
      @click="emit('addIngredient', selectedIngredient = { id: ingredient.id, name: ingredient.name })"
    >
      {{ ingredient.name }} {{ ingredient.id }}
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import '@/assets/recipeadder.css';
import { useAuth0 } from '@auth0/auth0-vue';
import type { IngredientExport, IngredientImport } from '@/types/recipe';

const selectedIngredient = ref<IngredientExport | null>(null);
const availableIngredients = ref<IngredientImport[]>([]);
const openIngredientPicker = ref<boolean>(false);
const { getAccessTokenSilently, isAuthenticated } = useAuth0();
const emit = defineEmits<{(event: 'addIngredient', value: IngredientExport): void}>();

const API_BASE = import.meta.env.VITE_API_SERVER_URL;
const API_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;

const page = ref<number>(1);

onMounted(() => {
  loadIngredients();
});

async function loadIngredients(
  scrollTop?: number,
  clientHeight?: number,
  scrollHeight?: number
) {
  try {
    let token: string | undefined;
    if (isAuthenticated.value) {
      token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_AUDIENCE,
          scope: 'read:ingredients'
        }
      });
    }

    if (page.value === 1) {
      // first page, just load
      const { data } = await axios.get<IngredientImport[]>(
        `${API_BASE}/ingredients?page=${page.value}`,
        { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
      );
      availableIngredients.value.push(...data);
      page.value += 1;
    } else {
      const nearBottom =
        typeof scrollTop === 'number' &&
        typeof clientHeight === 'number' &&
        typeof scrollHeight === 'number' &&
        scrollTop + clientHeight >= scrollHeight - 1;

      if (!nearBottom) return;

      const { data } = await axios.get<IngredientImport[]>(
        `${API_BASE}/ingredients?page=${page.value}`,
        { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
      );

        availableIngredients.value.push(...data);
        page.value += 1;
      
    }
  } catch (e) {
    console.error('Error fetching ingredients:', e);
  } finally {
    // no-op
  }
}
</script>
