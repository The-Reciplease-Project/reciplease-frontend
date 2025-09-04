<script setup lang="ts">

import { useAuth0 } from '@auth0/auth0-vue'
import { useWeatherService, type WeatherForecast } from '@/services/external-api.service'

import LoginButton from './LoginButton.vue'
import SignupButton from './SignupButton.vue'
import LogoutButton from './LogoutButton.vue'
import { ref, computed } from "vue";

const { isAuthenticated, isLoading } = useAuth0()
const forecasts = ref<WeatherForecast[]>([]);
const errorMsg = ref<string | null>(null);
const { getWeather } = useWeatherService();




async function onGetWeather() {
  errorMsg.value = null;
  try {
    forecasts.value = await getWeather();
  } catch (e: any) {
    errorMsg.value = e?.message ?? "Failed to fetch weather";
  }
}
</script>

<template>

<!-- Auth buttons -->
<div v-if="!isLoading" class="mb-4 flex gap-2">
  <template v-if="isAuthenticated">
    <LogoutButton />
        <div>
      <button @click="onGetWeather">Get Weather Data</button>
    </div>
    
  </template>
  <template v-else>
    <LoginButton @login-error="errorMsg = 'Please click the verification link sent to your email.'" />
    <SignupButton />

    
  </template>
</div>


 <div v-if="errorMsg" style="color:red">{{ errorMsg }}</div>


  <div>
    <ul v-if="forecasts.length">
      <li v-for="(f, i) in forecasts" :key="i">
        {{ f.date }} — {{ f.temperatureC }}°C — {{ f.summary }}
      </li>
    </ul>
  </div>
</template>
