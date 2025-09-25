<script setup lang="ts">

import { useAuth0 } from '@auth0/auth0-vue'
import { useWeatherService, type WeatherForecast } from '@/services/external-api.service'
import LoginButton from './LoginButton.vue'
import SignupButton from './SignupButton.vue'
import LogoutButton from './LogoutButton.vue'
import { ref } from "vue";

const { isAuthenticated, isLoading } = useAuth0()
const forecasts = ref<WeatherForecast[]>([]);
const errorMsg = ref<string | null>(null);
const { getWeather } = useWeatherService();

console.log("Authentication:", isAuthenticated.value);

async function onGetWeather() {
  errorMsg.value = null;
  try {
    forecasts.value = await getWeather();
  } catch (e: any) {
    errorMsg.value = e?.message ?? "Failed to fetch weather";
  }
}

import { useUserInfo, type UserInfo } from '@/services/userinfo.service'

const { getUserInfo } = useUserInfo();
const me = ref<UserInfo | null>(null);
const rate = ref<any>(null);
const err = ref<string | null>(null);

async function loadMe() {
  try {
    const { profile, rateLimit } = await getUserInfo();
    me.value = profile;
    rate.value = rateLimit;
  } catch (e: any) {
    err.value = e?.message ?? "Failed to load user info";
  }
}
</script>

<template>
  <div v-if="!isLoading" class="mb-4 flex gap-2">
    <template v-if="isAuthenticated">
      <LogoutButton />
      <div>
          <button @click="onGetWeather">Get Weather Data</button>
      </div>


      <div>
          <button @click="loadMe">Load /userinfo</button>
          <pre v-if="me">{{ me }}</pre>
          <pre v-if="rate">Rate limit: {{ rate }}</pre>
          <p v-if="err" style="color:red">{{ err }}</p>
      </div>

    </template>
  
    <template v-else>
      <LoginButton  />
      <SignupButton />
    </template>
  </div>


  <div>
    <ul v-if="forecasts.length">
      <li v-for="(f, i) in forecasts" :key="i">
        {{ f.date }} — {{ f.temperatureC }}°C — {{ f.summary }}
      </li>
    </ul>
  </div>
</template>
