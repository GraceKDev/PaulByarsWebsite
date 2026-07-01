<script lang="ts" setup>
import SocialCard from '../Cards/SocialCard.vue'
const socials = [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/paulbyersphotography/',
        icon: '/icons/instagram.svg'
    },
    {
        name: 'X/Twitter',
        url: 'https://x.com/paulbyersphoto',
        icon: '/icons/xTwitter.svg'
    },
    {
        name: 'Flickr',
        url: 'https://www.flickr.com/photos/paulbyersphotography/',
        icon: '/icons/flickr.svg'
    },
    {
        name: 'Email Me',
        url: "mailto:PaulByers3@gmail.com",
        icon: '/icons/mail.svg'
    }
]
</script>

<template>
    <section class="socials" aria-label="Socials">
        <div class="socials-inner">
            <header class="section-header">
                <p class="section-eyebrow">Connect</p>
                <h2 class="section-heading">Connect with me</h2>
                <div class="section-divider"></div>
            </header>
            <div class="socials-grid">
                <SocialCard v-for="(social, index) in socials" :key="index" :name="social.name" :url="social.url"
                    :icon="social.icon" :style="{ '--i': index }" />

            </div>
        </div>
    </section>
</template>

<style scoped>
.socials {
    width: 100%;
    padding: 7rem 8vw;
    background:
        radial-gradient(circle at 20% 40%, rgba(255, 255, 255, .08), transparent 10%),
        radial-gradient(circle at 80% 60%, rgba(255, 255, 255, .08), transparent 35%),
        #090909;
    background-size: 16px 16px;
    box-sizing: border-box;
    min-height: 100vh;
}

.socials-inner {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 14rem);
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
    margin: 1.5rem 0 0;
}

.socials-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    max-width: 600px;
    margin: auto auto;
}

.socials-grid>* {
    flex: 0 0 260px;
}
</style>