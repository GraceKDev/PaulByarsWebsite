<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const allPhotos = Object.keys(
  import.meta.glob('/public/ImagesHero/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}')
).map(p => p.replace('/public', ''))

const currentIndex = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % allPhotos.length
}

onMounted(() => {
  if (allPhotos.length > 0) {
    intervalId = setInterval(nextSlide, 4000)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section class="hero" aria-label="Hero">
    <div class="hero-bg">
      <Transition name="hero-fade" mode="out-in">
        <img
          :key="currentIndex"
          :src="allPhotos[currentIndex]"
          class="hero-bg-img"
          alt=""
        />
      </Transition>
    </div>

    <div class="hero-overlay"></div>

    <div class="glow glow-a" aria-hidden="true"></div>
    <div class="glow glow-b" aria-hidden="true"></div>

    <div class="hero-text">
      <p class="eyebrow">Portfolio</p>
      <h1 class="name">
        <span class="name-filled">Paul</span>
        <span class="name-outline">Byers</span>
      </h1>
      <div class="divider"></div>
      <p class="caption">Photography</p>
    </div>
  </section>
</template>
<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 8vw;
  overflow: hidden;
  background: #0d0d0d;
  box-sizing: border-box;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1.2s ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(135deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.55) 100%);
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 1;
}

.glow-a {
  width: 80vw;
  height: 50vw;
  top: -15%;
  right: -10%;
  background: radial-gradient(circle, rgba(232, 217, 181, 0.12) 0%, transparent 70%);
}

.glow-b {
  width: 70vw;
  height: 70vw;
  bottom: -10%;
  left: -10%;
  background: radial-gradient(circle, rgba(232, 217, 181, 0.08) 0%, transparent 70%);
}

.hero-text {
  position: relative;
  z-index: 2;
}

.eyebrow {
  font-size: clamp(0.65rem, 1.1vw, 0.8rem);
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin: 0 0 1.75rem;
}

.name {
  display: flex;
  flex-direction: column;
  font-size: clamp(4rem, 8vw, 9rem);
  font-weight: 800;
  line-height: 0.88;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  margin: 0;
}

.name-filled {
  color: #ffffff;
}

.name-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.55);
}

.divider {
  width: 2.75rem;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.25);
  margin: 2.25rem 0;
}

.caption {
  font-size: clamp(0.7rem, 1.2vw, 0.85rem);
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

@media (max-width: 768px) {
  .hero {
    justify-content: center;
    text-align: center;
    padding: 0 6vw;
  }

  .hero-overlay {
    background:
      linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.45) 100%);
  }

  .name {
    font-size: clamp(3rem, 12vw, 5rem);
  }

  .divider {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
