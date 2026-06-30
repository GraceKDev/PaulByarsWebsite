<script setup lang="ts">
const allPhotos = Object.keys(
  import.meta.glob('/public/ImagesHero/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}')
).map(p => p.replace('/public', ''))

const photosA = allPhotos.slice(0, 10)
const photosB = allPhotos.slice(10, 20)
const photosC = allPhotos.slice(20, 30)
</script>

<template>
  <section class="hero" aria-label="Hero">
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
    <div class="hero-visual" aria-hidden="true">
      <div class="strip-perspective">
        <div class="strip-grid">
          <div class="strip-track row-left">
            <img v-for="(src, i) in [...photosA, ...photosA]" :key="'a'+i" :src="src" class="strip-photo" draggable="false" alt="" />
          </div>
          <div class="strip-track row-right">
            <img v-for="(src, i) in [...photosB, ...photosB]" :key="'b'+i" :src="src" class="strip-photo" draggable="false" alt="" />
          </div>
          <div class="strip-track row-left ">
            <img v-for="(src, i) in [...photosC, ...photosC]" :key="'c'+i" :src="src" class="strip-photo" draggable="false" alt="" />
          </div>
        </div>
      </div>
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
  gap: clamp(3rem, 6vw, 7rem);
  overflow: hidden;
  background: #2b2517;
  box-sizing: border-box;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}
.glow-a {
  width: 100vw;
  height: 55vw;
  top: -10%;
  right: -10%;
  background: radial-gradient(circle, rgba(44, 41, 23, 0.2) 0%, transparent 70%);
}
.glow-b {
  width: 100vw;
  height: 100vw;
  bottom: 5%;
  left: 5%;
  background: radial-gradient(circle, rgba(44, 41, 23, 0.2) 0%, transparent 70%);
}

.hero-text {
  position: relative;
  z-index: 10;
  flex: 0 0 auto;
  align-self: flex-start;
  padding-top: clamp(4.5rem, 12vh, 9rem);
}

.eyebrow {
  font-size: clamp(0.65rem, 1.1vw, 0.8rem);
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin: 0 0 1.75rem;
}

.name {
  display: flex;
  flex-direction: column;
  font-size: clamp(5rem, 9.5vw, 10rem);
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

.hero-visual {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;

  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}

.strip-perspective {
  perspective: 1200px;
  width: 100%;
}


.strip-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: rotateX(0deg);
  transform-origin: center center;
}

.strip-track {
  display: flex;
  gap: 0;
  will-change: transform;
}

.row-left  { animation: marquee-left  28s linear infinite; }
.row-right { animation: marquee-right 28s linear infinite; }
.row-slow  { animation-duration: 38s; }

.strip-photo {
  flex: 0 0 auto;
  width: 280px;
  height: 360px;
  object-fit: cover;
  border-radius: 4px;
  opacity: 0.18;
  margin-right: 20px;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-3000px); }
}
@keyframes marquee-right {
  from { transform: translateX(-3000px); }
  to   { transform: translateX(0); }
}


</style>
