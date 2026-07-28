<script lang="ts" setup>
import { ref } from 'vue'
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

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

</script>

<template>
  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <RouterLink v-for="(route, index) in routes" :key="index" :to="route.to" class="nav-link" @click="closeMenu">
        {{ route.name }}
      </RouterLink>
    </nav>

    <button class="burger" :class="{ 'burger--open': isMenuOpen }" @click="toggleMenu" aria-label="Toggle navigation"
      aria-expanded="false">
      <span class="burger-bar"></span>
      <span class="burger-bar"></span>
      <span class="burger-bar"></span>
    </button>
  </header>

  <Transition name="mobile-slide">
    <aside v-if="isMenuOpen" class="mobile-drawer">
      <div class="close" v-on:click="closeMenu">
        <svg xmlns="http://w3.org" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
      <nav class="mobile-nav" aria-label="Mobile navigation">
        <RouterLink v-for="(route, index) in routes" :key="index" :to="route.to" class="mobile-nav-link"
          @click="closeMenu">
          {{ route.name }}
        </RouterLink>
      </nav>
    </aside>
  </Transition>
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

.close {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 10%;
  margin-top: 3%;
  color:#e8d9b5;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
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

.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 200;
}

.burger-bar {
  display: block;
  width: 1.6rem;
  height: 2px;
  background: #e8d9b5;
  border-radius: 1px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.burger--open .burger-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.burger--open .burger-bar:nth-child(2) {
  opacity: 0;
}

.burger--open .burger-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-drawer {
  position: fixed;
  inset: 0;
  background: #0b0a13;
  z-index: 150;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.mobile-nav-link {
  color: #e8d9b5;
  text-decoration: none;
  font-size: 1.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.75;
  transition: opacity 0.2s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-exact-active {
  opacity: 1;
  color: #f5e6c0;
}

.mobile-slide-enter-active,
.mobile-slide-leave-active {
  transition: transform 0.35s ease;
}

.mobile-slide-enter-from,
.mobile-slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .burger {
    display: flex;
  }
}
</style>
