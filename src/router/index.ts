import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ContactView from '../views/Contact.vue'
import GalleryView from '../views/Gallery.vue'
import SignInView from '../views/SignIn.vue'
import AdminDashboardView from '../views/AdminDashboard.vue'
import { checkAuth } from '../lib/api/auth.ts'


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



router.beforeEach(async (to, from) => {
  switch (to.name) {
    case 'admin':
      if (!await checkAuth()) {
        return { name: 'signin' }
      }
      break;
    case 'signin':
      if (await checkAuth()) {
        return { name: 'admin' }
      }
      break;
  }
})

export default router
