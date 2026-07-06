<script setup lang="ts">
const AboutMeText = "Hi, I’m Paul — a 35 year old photographer with over nine years of experience capturing moments across sport, travel, and everyday life. My work ranges from the fast-paced action of the Scottish Football Premier League, Aussie Rules, and netball, to the energy of live concerts and the storytelling of street and travel photography. I’ve had the opportunity to work with two major agencies and provide PR imagery for a variety of clients, helping bring their stories to life through strong, engaging visuals. Alongside photography, I’ve developed experience in drone work, allowing me to explore new creative angles and perspectives. I’m highly proficient in Adobe Lightroom and Photoshop, and I’m currently building my skills in video editing to expand into motion storytelling.";
</script>

<template>
    <section class="about-me" aria-label="About Me">
        <div class="about-me-inner">
            <header class="section-header">
                <p class="section-eyebrow">About Me</p>
                <h2 class="section-heading">A little about me</h2>
                <div class="section-divider"></div>
            </header>
            <div class="about-me-content">
                <p class="about-me-text ">
                    {{ AboutMeText }}
                </p>
                <div class="about-me-image">
                    <img src="/ImagesHero/Photo 3-4-2026, 21 06 11 (11).jpg" alt="Paul Byers Photography" />
                </div>

            </div>
        </div>

    </section>
</template>
<style scoped>
.about-me {
    width: 100%;
    min-height: 100vh;
    padding: 7rem 8vw;
    background:
        radial-gradient(circle at top,
            #1c1c1c 0%,
            #121212 35%,
            #121212 100%);
}

.about-me-inner {
    display: flex;
    flex-direction: column;
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

.about-me-content {
    display: flex;
    
    gap: 2rem;
    margin-top: 4.5rem;
}
.about-me-text {
    flex-basis: 60%;
    max-width: 1200px;
    margin: 0 auto;
    font-size: clamp(1rem, 2.5vw, 1.125rem);
    line-height: 1.75;
    letter-spacing: 0.02em;
    color: rgb(255, 255, 255);
}
.about-me-image {
    flex-basis: 40%;
    flex-grow: 1;
    margin: 0 auto;
    border-radius: 0.5rem;
    overflow: hidden;
}
.about-me-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>