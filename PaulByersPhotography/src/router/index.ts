import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/gallery', name: 'gallery', component: () => import('../views/Gallery.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
