<script lang="ts" setup>
import ReferenceCard from '../Cards/ReferenceCard.vue';
import type { ReferenceInterface } from '../../lib/types/ReferenceInterface';

const references: ReferenceInterface[] = [
    {
        author: 'John Smith',
        company: 'ABC Photography',
        quote: 'Paul is an exceptional photographer. His attention to detail and creativity is unmatched.',
        image: '/logos/abc-photography.png'
    },
    {
        author: 'Jane Doe',
        company: 'XYZ Photography',
        quote: 'Paul is a talented photographer. His work is always creative and professional.',
        image: '/logos/xyz-photography.png'
    }
]
</script>

<template>
    <section class="references" aria-label="References">
        <div class="references-inner">
            <header class="section-header">
                <p class="section-eyebrow">References</p>
                <h2 class="section-heading">What people are saying</h2>
                <div class="section-divider"></div>
            </header>
            <div class="references-grid">
                <ReferenceCard v-for="(reference,index) in references" 
                :key="index" 
                :author="reference.author" 
                :company="reference.company" 
                :quote="reference.quote" 
                :logo="reference.image" />
            </div>
        </div>

    </section>
</template>

<style scoped>
.references {
    width: 100%;
    min-height: 100vh;
    padding: 7rem 8vw;
    background:
        radial-gradient(circle,
            transparent 40%,
            rgba(0, 0, 0, .45) 100%),
        #090909;
   
    box-sizing: border-box;
}

.references-inner {
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
.references-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
}
</style>