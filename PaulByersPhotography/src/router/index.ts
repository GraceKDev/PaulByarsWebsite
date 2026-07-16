import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ContactView from '../views/Contact.vue'
import GalleryView from '../views/Gallery.vue'
import SignInView from '../views/SignIn.vue'
import AdminDashboardView from '../views/AdminDashboard.vue'
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/gallery', name: 'gallery', component: GalleryView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/signin', name: 'signin', component: SignInView },
  { path: '/admin', name: 'admin', component: AdminDashboardView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
