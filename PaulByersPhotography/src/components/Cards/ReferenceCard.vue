<script setup lang="ts">
const props = defineProps<{
    author:string
    company:string
    quote:string
    logo:string
}>()

</script>

<template>
    <article class="reference-card">
        <img :src="logo" :alt="company" class="reference-logo" />
        <blockquote class="reference-quote">{{ quote }}</blockquote>
        <p class="reference-author">{{ author }}</p>
        <p class="reference-company">{{ company }}</p>
    </article>
</template>

<style scoped>
.reference-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    background-color: #1a1a1a;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.reference-logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 1rem;
}

.reference-quote {
    font-size: 1rem;
    font-style: italic;
    color: #ffffff;
    margin-bottom: 1rem;
}

.reference-author {
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 0.5rem;
}

.reference-company {
    color: rgba(255, 255, 255, 0.6);
}
</style>