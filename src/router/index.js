import { createRouter, createWebHistory } from 'vue-router'
import Infopage1 from '../views/infopage1.vue'

const routes = [
  {
    path: '/',
    name: 'infopage1',
    component: Infopage1
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
