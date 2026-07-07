<script lang="ts" setup>
import { RouterLink } from 'vue-router'

interface NavRoute {
  to: string
  name: string
}

const routes: NavRoute[] = [
  { to: '/', name: 'Home' },
  { to: '/gallery', name: 'Gallery' },
  { to: '/contact', name: 'Contact Me' },
]
</script>

<template>
  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <RouterLink 
        v-for="(route, index) in routes"
        :key="index"  
        :to="route.to"
        class="nav-link"
      >
        {{ route.name }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem 8vw;
  box-sizing: border-box;
  background: transparent;
}

.nav {
  display: flex;
  gap: 2.5rem;
}

.nav-link {
  color: #e8d9b5;
  text-decoration: none;
  font-size: 1.5rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.75;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  opacity: 1;
  color: #f5e6c0;
}
</style>
