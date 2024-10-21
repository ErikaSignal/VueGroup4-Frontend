import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '/src/views/HomePage.vue';
import Infopage1 from '/src/views/infopage1.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/infopage/:id',
    name: 'MoviePage',
    component: Infopage1
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
