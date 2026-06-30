<script setup lang="ts">
import { type ServiceCardInterface } from '../../lib/types/ServiceCardInterface.ts'
import ServiceCard from '../Cards/ServiceCard.vue'

const experiences: ServiceCardInterface[] = [
    {
        title: 'Sporting Events',
        description: 'Covering Pines football club with a range of photos for all their players including headshots and in game photos as well as Worked at a variety of games across the league including Celtic and Rangers games and had the opportunity from St Mirren football club to work in a club environment covering training sessions and in game action.',
        images: [
            '/ImagesHero/Photo 3-4-2026, 21 06 11 (11).jpg',
            '/ImagesHero/Photo 3-4-2026, 21 06 11 (10).jpg',
            '/ImagesHero/Photo 3-4-2026, 21 06 11 (9).jpg'
        ]
    },
    {
        title: 'Concerts and Performances',
        description: 'I had the opportunity to work at the connect festival covering a range of artists and also working with Platinum selling artist Paolo Nutini covering his gigs in Italy and Ireland.',
        images: [
            '/ImagesHero/Photo 20-8-2025, 21 06 41.jpg',
            '/ImagesHero/Photo 20-8-2025, 20 16 19.jpg',
            '/ImagesHero/Photo 20-8-2025, 19 36 24.jpg'
        ]
    },
    {
        title: 'Travel Photography',
        description: "I've had the opportunity to take images from 57 countries across the world while exploring the different cultures and landscapes.",
        images: [
            '/ImagesHero/Photo 28-3-2026, 08 29 54.jpg',
            '/ImagesHero/Photo 28-3-2026, 07 59 19.jpg',
            '/ImagesHero/Photo 28-3-2026, 07 38 48.jpg'
        ]
    },
    {
        title: 'Street Photography',
        description: 'I have captured various people in street photography capturing fast paced people in the moment including black and white photos.',
        images: [
            '/ImagesHero/Photo 25-1-2026, 22 29 07.jpg',
            '/ImagesHero/Photo 25-1-2026, 19 37 48.jpg',
            '/ImagesHero/Photo 24-1-2026, 23 25 49.jpg'
        ]
    },
    {
        title: 'Drone Work',
        description: 'Taking photos from a unique angle above the ground and giving a different perspective on photography.',
        images: [
            '/ImagesHero/Photo 15-8-2025, 19 25 51.jpg',
            '/ImagesHero/Photo 13-9-2025, 15 39 16.jpg',
            '/ImagesHero/Photo 3-8-2025, 17 00 03.jpg'
        ]
    }
]
</script>

<template>
    <section class="experiences" aria-label="Experiences">
        <div class="experiences-inner">
            <header class="section-header">
                <p class="section-eyebrow">Expertise</p>
                <h2 class="section-heading">What I Do</h2>
                <div class="section-divider"></div>
            </header>
            <div class="card-grid">
                <ServiceCard
                    v-for="(experience, index) in experiences"
                    :key="index"
                    :title="experience.title"
                    :description="experience.description"
                    :images="experience.images"
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
.experiences {
    width: 100%;
    min-height: 100vh;
    padding: 7rem 8vw;
    background: #0b0a13;
    box-sizing: border-box;
}

.experiences-inner {
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
    margin: 0;
}

.section-divider {
  
    height: 1.5px;
    background: rgba(232, 217, 181, 0.28);
    margin: 1.5rem auto 0;
}

.card-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;

    max-width: 1200px;
    margin: 0 auto;
}

.card-grid > * {
    flex: 0 0 320px;
}
</style>
