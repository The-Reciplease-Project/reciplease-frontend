<template>
    <div>
        <label>
            <span>Recipe Name</span>

        </label>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

defineProps<{ modelValue: string }>(); // Props are send to the child component
defineEmits<{ (e: 'update:model', value: string): void }>();



export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

