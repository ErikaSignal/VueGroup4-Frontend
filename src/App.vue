<script setup>
import { useRouter } from 'vue-router'; // Importera useRouter om du behöver det
import router from './router'; // Importera din router
</script>

<template>
  <main>
    <router-view></router-view> <!-- Använd router-view för att visa den aktuella komponenten -->
  </main>
</template>
