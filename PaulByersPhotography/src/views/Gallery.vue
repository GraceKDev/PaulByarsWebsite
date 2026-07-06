<script setup lang="ts">
</script>

<template>
  <section class="gallery" aria-label="Gallery">
    <div class="gallery-inner">
      <header class="section-header">
        <p class="section-eyebrow">Portfolio</p>
        <h2 class="section-heading">Gallery</h2>
        <div class="section-divider"></div>
      </header>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  width: 100%;
  min-height: 100vh;
  padding: 7rem 8vw;
  background:
    radial-gradient(circle, transparent 40%, rgba(0, 0, 0, .45) 100%),
    #090909;
  box-sizing: border-box;
}

.gallery-inner {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 4.5rem;
}

.section-eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.48em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
  margin: 0 0 0.85rem;
}

.section-heading {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #ffffff;
}

.section-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 2.5rem 0 0;
}
</style>
