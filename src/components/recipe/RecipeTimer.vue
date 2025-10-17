<template>
    <div>
         <h4> Timer </h4>
    <div>
        {{ convertTimeFromSeconds(time) }}
    </div>
    <button @click="emit('startedTimer')">Start</button>
    <button @click="emit('stoppedTimer')">Stop</button>
    <button @click="emit('resetTimer')">Reset</button>

    </div>
</template>

<script setup lang="ts">
import { useTimer} from '@/composables/useTimer';
const { convertTimeFromSeconds } = useTimer();

import { defineEmits } from 'vue';

const emit = defineEmits<({(e: 'startedTimer'): void, (e: 'stoppedTimer'): void, (e: 'resetTimer'): void})>();
const props = defineProps<{ time: number }>();

</script>

<style scoped>

</style>