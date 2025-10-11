<template> 
<button @click="handleLogin">Log In</button> 
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'; 
import { ref } from 'vue';


const AUDIENCE = "https://reciplease-api"
const { loginWithRedirect, getAccessTokenSilently } = useAuth0();


async function handleLogin(){
    try{
      const token = await getAccessTokenSilently({
      authorizationParams: { audience: AUDIENCE }
      });

      if (token.split(".").length !== 3) {
        throw new Error("Expected a 3-part JWT access token");
      }
      await loginWithRedirect({
      appState: {
          target: "/",
      }
      })
    } catch(e: any) {
        const err = e?.error || e?.message; 
        if (
        err.includes("consent_required") ||
        err.includes("login_required") ||
        err.includes("interaction_required")
      ) {
        await loginWithRedirect({
          authorizationParams: { audience: AUDIENCE, scope: "openid profile email" }
        });
        return; // the app will redirect; next call will succeed
      }
      throw e;
    }
    
};


</script>

<style scoped>
button { padding: .5rem .75rem; border: 1px solid #ccc; border-radius: .5rem; }
</style>