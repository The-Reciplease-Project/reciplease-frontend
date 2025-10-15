<template>
    <h3> Recipe Steps </h3>
    <h4> Timer </h4>
    <div>
        {{ time }}
    </div>
    {{ timeIsRunning }}
    {{ intervalId }}
    <button @click="startTimer">Start</button>
    <button @click="stopTimer"> Stop </button>
    <button @click="resetTimer"> Reset </button>
    <div>
        <ul v-for="(step, index) in steps" :key="index">
            <li>
                <input placeholder="Enter step description"></input>
                <div v-if="step.hasStarted === false">
                    <button  @click="step.startTime = time ; step.hasStarted = true">Begin Step</button>
                </div>
                <div v-if="step.hasStarted === true">
                        <button  @click="step.endTime = time">End Step</button>
                </div>
        
<p> {{ step.startTime === null ? 'Not Started' : `00:${step.startTime} - ${time}`}} {{ step.endTime === null && step.hasStarted? time : step.endTime }}  </p>
<p> {{ `${step.startTime !== null && step.endTime !== null ? step.startTime - step.endTime : ''} est. time`}}</p>
            </li>
        </ul>
        <button @click="addStep">Add Step</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export type RecipeStep = {
    description: string;
    startTime: number | null;
    endTime: number | null;
    hasStarted?: boolean;
    hasEnded?: boolean;
}

const steps = ref<RecipeStep[]>([
  {
    description: '',
    startTime: null,
    endTime: null,
    hasStarted: false, // ✅ starts as false
    hasEnded: false
  }
])



function addStep() {
    steps.value.push({
        description: '',
        startTime: null,
        endTime: null
    });
}

const time = ref<number>(0);
const timeIsRunning = ref<boolean>(false);
const intervalId = ref<number | null>(null);
function startTimer() {
    if(intervalId.value !== null) return; // Prevent stacking multiple intervals
    timeIsRunning.value = true;
    intervalId.value = setInterval(() => {
        time.value += 1;
    }, 1000);
}

function stopTimer() {
    timeIsRunning.value = false;
    if(intervalId.value !== null) {
        clearInterval(intervalId.value);
        intervalId.value = null;
    }
}

function resetTimer() {
    stopTimer();
    time.value = 0;
    intervalId.value = null;
}



function getEndStepTime() {
    return time.value;
}   

 


</script>

<style scoped>

</style>