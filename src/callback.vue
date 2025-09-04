

<template>
    <div>
        <p> My milkshakes bring all the girls to the yard.</p>
        <p> Also, please verify you email </p>
    </div>
</template>

<script setup lang="ts">

import { useAuth0 } from '@auth0/auth0-vue';
import { onMounted } from 'vue';
const { handleRedirectCallback } = useAuth0(); // Storing a reference to this function in a constant variable

// async onMounted({
    
//     try : {
//         await handleRedirectCallback();
//     }
//     catch(e: any){

//     }
    

// })

</script>

<style lang="scss" scoped>

</style>