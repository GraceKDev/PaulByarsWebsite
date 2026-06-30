<script lang="ts" setup>
const props = defineProps<{
    url: string
    icon: string
    name: string
}>()
</script>

<template>
    <a
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="social-card"
    >
        <img :src="icon" :alt="name" class="social-icon" />
        <span class="social-name">{{ name }}</span>
    </a>
</template>

<style scoped>
.social-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #1a1a1a;
    gap: 0.75rem;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
}

.social-card::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 3px dashed #4a4a4a;
    animation: lens-spin 16s linear infinite;
    z-index: -1;
    pointer-events: none;
}

.social-card::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    border: 2px solid #4a4a4a;
    pointer-events: none;
    z-index: 1;
}

.social-card:hover {
    transform: scale(1.06);
    background: #252525;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}

.social-icon {
    width: 48px;
    height: 48px;
    filter: brightness(0) invert(1);
    position: relative;
    z-index: 2;
}

.social-name {
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-align: center;
    position: relative;
    z-index: 2;
}

@keyframes lens-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
