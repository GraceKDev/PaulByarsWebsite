<script setup lang="ts">
import { type ServiceCardInterface } from '../../lib/types/ServiceCardInterface.ts'
import ServiceCard from '../Cards/ServiceCard.vue'

const experiences: ServiceCardInterface[] = [
    {
        title: 'Sporting Events',
        description: 'Covering Pines football club with a range of photos for all their players including headshots and in game photos as well as Worked at a variety of games across the league including Celtic and Rangers games and had the opportunity from St Mirren football club to work in a club environment covering training sessions and in game action.',
        images: [
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+2-11-2025%2C+14+32+03.jpg',
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+7-10-2024%2C+19+56+23.jpg',
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+2-11-2025%2C+16+27+06.jpg'
        ]
    },
    {
        title: 'Concerts and Performances',
        description: 'I had the opportunity to work at the connect festival covering a range of artists and also working with Platinum selling artist Paolo Nutini covering his gigs in Italy and Ireland.',
        images: [
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+20-7-2022%2C+22+31+11.jpg',
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+20-7-2022%2C+22+04+07.jpg',
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+20-7-2022%2C+22+20+54.jpg'
        ]
    },
    {
        title: 'Travel Photography',
        description: "I've had the opportunity to take images from 57 countries across the world while exploring the different cultures and landscapes.",
        images: [
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+12-1-2024%2C+18+07+13.jpg',
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+16-11-2018%2C+20+30+09.jpg',
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+22-7-2020%2C+19+16+46.jpg'
        ]
    },
    {
        title: 'Street Photography',
        description: 'I have captured various people in street photography capturing fast paced people in the moment including black and white photos.',
        images: [
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+10-1-2026%2C+07+37+21.jpg',
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+12-1-2026%2C+09+37+23.jpg',
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+16-12-2025%2C+20+15+32.jpg'
        ]
    },
    {
        title: 'Drone Work',
        description: 'Taking photos from a unique angle above the ground and giving a different perspective on photography.',
        images: [
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+10-2-2026%2C+19+03+59.png',
            'https://paulbyers-544885083248-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/Site/Photo+24-1-2026%2C+23+25+49.jpg',
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
                <ServiceCard v-for="(experience, index) in experiences" 
                :key="index" 
                :title="experience.title"
                :description="experience.description" 
                :images="experience.images"
                loading="lazy"
                alt="services"
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
    background:
        radial-gradient(
            circle at top,
            #1c1c1c 0%,
            #121212 35%,
            #090909 100%
        );
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
    height: 0.125rem;
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

.card-grid>* {
    flex: 0 0 320px;
}
</style>
