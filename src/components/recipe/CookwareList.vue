<template>
    <div>
        <ul v-if="props.items.length">
            <li v-for="(item, index) in items" :key="index">
                {{ item.name }}

                <button 
                type="button"
                aria-label="Remove Cookware"
                @click="emit('remove', index)">
                Remove Cookware
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { CookwareExport } from '@/types/recipe';

const emit = defineEmits<{(event: 'remove', index: number): void}>();
const props = defineProps<{ items: CookwareExport[] }>();
</script>