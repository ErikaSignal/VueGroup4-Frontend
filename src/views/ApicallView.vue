<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.release_date }}</p>
      <p>{{ post.producer }}</p>
      <p>{{ post.director }}</p>
      <p>{{ post.opening_crawl }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getOneMovie } from '../services/api.js'

const route = useRoute()
const post = ref(null)
const error = ref(null)
const loading = ref(false)

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData() {
  loading.value = true
  post.value = null
  error.value = null
  try {
    post.value = await getOneMovie(route.params.id) 
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>

