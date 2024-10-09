import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '/src/views/HomePage.vue';
import MoviePage from '/src/views/MoviePage.vue';
import Infopage1 from '/src/views/infopage1.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/infopage',
    name: 'Infopage',
    component: Infopage1
  },
  {
    path: '/movie/:id',
    name: 'MoviePage',
    component: MoviePage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
