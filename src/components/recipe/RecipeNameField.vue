<template>
   <label>
        <span>Recipe Name</span>
        <input 
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
        placeholder="Enter recipe name" />
    </label>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>(); // Props are send to the child component
defineEmits<{ (e: 'update:modelValue', value: string): void }>();
defineEmits
</script>

