<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const props = defineProps<{
    title: string
    description: string
    images: string[]
}>()

const currentIndex = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

function startCycle() {
    if (props.images.length <= 1) return
    intervalId = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % props.images.length
    }, 2200)
}

function stopCycle() {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
    currentIndex.value = 0
}

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
})
</script>

<template>
    <article
        class="service-card"
        @mouseenter="startCycle"
        @mouseleave="stopCycle"
    >
        <div class="card-media">
            <img
                v-for="(img, i) in images"
                :key="i"
                :src="img"
                :alt="title"
                class="card-image"
                :class="{ 'card-image--active': i === currentIndex }"
                loading="lazy"
            />
            <div class="card-media-overlay"></div>
        </div>
        <div class="card-body">
            <h3 class="card-title">{{ title }}</h3>
            <span class="card-arrow" aria-hidden="true">&rarr;</span>
        </div>
        <div class="polaroid-pin"></div>
    </article>
</template>

<style scoped>
.service-card {
    position: relative;
    background: #f5f5f5;
    border: solid 0.5rem     rgb(0, 0, 0);
    overflow: hidden;
    cursor: pointer;
    padding: 0.7rem;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                box-shadow 0.4s ease,
                border-color 0.4s ease;
}

.service-card:hover {
    animation: swivel 1.2s ease-in-out infinite;
    box-shadow: 0 24px 64px rgba(24, 22, 22, 0.842);
    border-color: rgb(0, 0, 0);
    
}

.card-media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border:#000000 0.1rem solid;
    background: rgb(190, 189, 192);
}

.card-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.7s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-image--active {
    opacity: 1;
}

.service-card:hover .card-image--active {
    transform: scale(1.08);
}

.card-media-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to bottom,
        transparent 50%,
        rgba(21, 19, 26, 0.35) 80%,
        rgba(21, 19, 26, 0.7) 100%
    );
    pointer-events: none;
}

.card-body {
    position: relative;
    padding: 1.5rem 1.5rem 1.75rem;
}

.card-title {
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: "PermanentMarker", var(--sans);
    color: #000000;
    -webkit-line-clamp: 2;
    height: calc(1.3rem * 2);
    margin: 0 0 1.2rem;
    line-height: 1.3;

}

.card-description {
    font-size: 0.875rem;
    line-height: 1.72;
    color: rgba(0, 0, 0, 0.5);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-arrow {
    position: absolute;
    bottom: 1.75rem;
    right: 1.5rem;
    font-size: 1.2rem;
    color: rgba(232, 217, 181, 0.35);
    transition: transform 0.35s ease, color 0.35s ease;
}

.service-card:hover .card-arrow {
    transform: translateX(4px);
    color: rgba(232, 217, 181, 0.75);
}
.polaroid-pin {
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 1.5rem;
    height: 1.5rem;
    background: #2b2517;
    border-radius: 50%;
    box-shadow: 0 0 0 0.2rem rgb(0, 0, 0);
}

@keyframes swivel {
    0% {
        transform: rotateY(-8deg) rotateX(4deg) scale(1.02);
    }
    50% {
        transform: rotateY(8deg) rotateX(4deg) scale(1.02);
    }
    100% {
        transform: rotateY(-8deg) rotateX(4deg) scale(1.02);
    }
}
</style>
