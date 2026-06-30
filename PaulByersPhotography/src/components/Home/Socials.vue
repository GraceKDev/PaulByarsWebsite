<template>
    <section class="socials" aria-label="Socials">
    <div class="socials-inner">
        <header class="section-header">
            <p class="section-eyebrow">Connect</p>
            <h2 class="section-heading">Follow Me</h2>
            <div class="section-divider"></div>
        </header>

    </div>
    </section>
</template>

<style scoped>
.socials {
    width: 100%;
    padding: 7rem 8vw;
    background: #131218;
    box-sizing: border-box;
    min-height: 100vh;
}
.socials-inner {
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
    width: 3.5rem;
    height: 0.125rem;
    background: #e8d9b5;
    margin: 1.5rem 0 0;
}
</style>