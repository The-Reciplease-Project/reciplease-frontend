<template>
   <label>
        <span>Recipe Name</span>
        <input 
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
        placeholder="Enter recipe name" />
    </label>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'update:modelValue', value: string): void }>();
</script>

