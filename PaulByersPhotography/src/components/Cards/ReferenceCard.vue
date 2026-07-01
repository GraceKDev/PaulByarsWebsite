<script setup lang="ts">
const props = defineProps<{
    author: string
    company: string
    quote: string
    logo: string
}>()

</script>

<template>
    <article class="reference-card">
        <div class="reference-logo-container">
            <img :src="logo" :alt="company" class="reference-logo" />
        </div>
        <div class="reference-content">
            <blockquote class="reference-quote">{{ quote }}</blockquote>
            <p class="reference-author">{{ author }}</p>
            <p class="reference-company">{{ company }}</p>
        </div>
    </article>
</template>

<style scoped>
.reference-card {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    background: #0d0d0d;
    border: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    transition:
        transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        box-shadow 0.4s ease,
        border-color 0.4s ease,
        background 0.4s ease;
}

.reference-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(232, 217, 181, 0.12);
    transition: background 0.4s ease, width 0.4s ease;
}

.reference-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 56px rgba(0, 0, 0, 0.5);
    border-color: rgba(232, 217, 181, 0.2);
    background: #111111;
}

.reference-card:hover::before {
    background: rgba(232, 217, 181, 0.35);
    width: 3px;
}

.reference-logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    aspect-ratio: 1 / 1;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: #080808;
    transition: border-color 0.4s ease;
}

.reference-card:hover .reference-logo-container {
    border-color: rgba(232, 217, 181, 0.18);
}

.reference-logo {
    width: 56px;
    height: 56px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.85;
}

.reference-content {
    flex: 1;
    position: relative;
}

.reference-content::before {
    content: '\201C';
    position: absolute;
    top: -0.5rem;
    left: -0.25rem;
    font-size: 3rem;
    line-height: 1;
    font-family: Georgia, serif;
    color: rgba(232, 217, 181, 0.15);
    pointer-events: none;
}

.reference-quote {
    font-size: 1rem;
    font-style: italic;
    line-height: 1.72;
    color: rgba(255, 255, 255, 0.78);
    margin: 0 0 1.25rem;
    padding-left: 0.25rem;
}

.reference-author {
    font-weight: 600;
    font-size: 0.9rem;
    color: rgba(232, 217, 181, 0.75);
    text-align: right;
    margin: 0 0 0.25rem;
}

.reference-company {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.28);
    text-align: right;
    margin: 0;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}
</style>