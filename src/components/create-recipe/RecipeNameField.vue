<template>
   <label>
        <span >Recipe Name</span>
        <input 
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
        placeholder="Enter recipe name"
        :disabled="reachMaxLenght"/>
    </label>
    <small v-if="length > 255"> Reached maximum character count </small>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const reachMaxLenght = computed(() => {
    return length > 255 ? true : false;
})

defineEmits<{ (e: 'update:modelValue', value: string): void }>();
defineProps<{length: number, required: boolean }>();
</script>

