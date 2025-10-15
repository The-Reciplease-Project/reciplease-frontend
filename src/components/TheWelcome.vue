<script setup lang="ts">

import { useAuth0 } from '@auth0/auth0-vue'
import LoginButton from './home/LoginButton.vue'
import SignupButton from './home/SignupButton.vue'
import LogoutButton from './home/LogoutButton.vue'
import CreateRecipe from './CreateRecipe.vue'
import { ref } from "vue";

const { isAuthenticated, isLoading } = useAuth0()
const errorMsg = ref<string | null>(null);


console.log("Authentication:", isAuthenticated.value);



import { useUserInfo } from '@/services/userinfo.service'
import type { UserInfo } from '@/types/user';

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
      <RouterLink to="/add-recipe">
        <button class="thing" >Create Recipe</button>
      </RouterLink>
    </template>
  
    <template v-else>
      <LoginButton  />
      <SignupButton />
    </template>
  </div>
</template>

<style scoped>
.thing{
  display: block;
}
</style>
