<template>
  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a href="#home" class="nav-link">Home</a>
      <a href="#gallery" class="nav-link">Gallery</a>
      <a href="#contact" class="nav-link">Contact</a>
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

.nav-link:hover {
  opacity: 1;
  color: #f5e6c0;
}
</style>
