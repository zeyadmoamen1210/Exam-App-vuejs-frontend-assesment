<script setup>
import { onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import router from './router';
onMounted(() => {
  // user cant move to questions with url (without solve the prev questions)
  router.push(`/`)
})
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">

</style>
