<script setup lang="ts">

import { useAuth0, User } from '@auth0/auth0-vue'
import LoginButton from './LoginButton.vue'
import SignupButton from './SignupButton.vue'
import LogoutButton from './LogoutButton.vue'
import { ref, onMounted } from "vue";
import { useUserInfo } from '@/services/userinfo.service'
import type { UserInfo } from '@/types/user';

const { isAuthenticated, isLoading } = useAuth0()
const { getUserInfo } = useUserInfo();
const me = ref<UserInfo | null>(null);



onMounted(() => {
  loadUser();
}) 


async function loadUser() {
  try {
    const { profile } = await getUserInfo();
    me.value = profile;
  } catch (e: any) {
    console.log("Failed to load user info");
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

</style>
