import { createRouter, createWebHistory } from 'vue-router'
import Infopage1 from '../views/infopage1.vue'
import App from '../App.vue'

const routes = [
  {
    path: '/infopage',
    name: 'Infopage',
    component: Infopage1
  },
  {
    path: '/',
    name: 'App',
    component: App
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
