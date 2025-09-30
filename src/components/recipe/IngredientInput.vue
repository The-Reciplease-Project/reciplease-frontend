<template>
    <div>
        <input
        :value="value"
        @input="val => value = (val.target as HTMLInputElement).value"
        placeholder="Enter ingredient"
        @keyup="emitAdd"
        :disabled="props.disabledProp"
         />

        <button type="button" @click="emitAdd" >Add Ingredient</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref<string>('');
const emit = defineEmits<{(event: 'add', value: string): void}>();
const props = defineProps<{ disabledProp?: boolean }>();

function emitAdd(){
    let v = value.value.trim();
    if(!v) return;
    emit('add', v);
    value.value = '';
}

</script>
