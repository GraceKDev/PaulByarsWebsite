<script setup lang="ts">
import { reactive } from 'vue';

const contactForm = reactive({
    name: '',
    email: '',
    message: '',
});

const handleSubmit = () => {
    const subject = encodeURIComponent(`Photography Inquiry from ${contactForm.name}`);
    const body = encodeURIComponent(
        [
            `Name: ${contactForm.name}`,
            `Email: ${contactForm.email}`,
            '',
            contactForm.message,
        ].join('\n'),
    );

    window.location.href = `mailto:routepokemon@gmail.com?subject=${subject}&body=${body}`;
};
</script>
<template>
    <section class="contact-me" aria-label="Contact Me">
        <div class="contact-me-inner">
            <header class="section-header">
                <p class="section-eyebrow">Contact</p>
                <h2 class="section-heading">Get in touch</h2>
                <div class="section-divider"></div>
            </header>
            <div class="contact-me-content">
                <div class="contact-me-form-shell">
                    <form class="contact-me-form" @submit.prevent="handleSubmit">
                        <label aria-label="Name" for="name">Name</label>
                        <input v-model="contactForm.name" type="text" id="name" name="name" autocomplete="name" required />

                        <label aria-label="Email" for="email">Email</label>
                        <input v-model="contactForm.email" type="email" id="email" name="email" autocomplete="email" required />

                        <label aria-label="Message" for="message">Message</label>
                        <textarea v-model="contactForm.message" id="message" name="message" rows="6" required></textarea>

                        <p class="contact-me-note">This opens your default email app with the message pre-filled.</p>

                        <button class="contact-me-submit" type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.contact-me {
    width: 100%;
    min-height: 100vh;
    padding: 7rem 8vw;
    background:
        radial-gradient(circle at top,
            #1c1c1c 0%,
            #121212 35%,
            #121212 100%);
}
.contact-me-inner {
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
.contact-me-content {
    display: flex;
    gap: 2rem;
    margin-top: 4.5rem;
    margin:0 auto;
}
.contact-me-form-shell {
    width: min(100%, 42rem);
    padding: 2rem;
    border: 1px solid rgba(232, 217, 181, 0.12);

    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
}
.contact-me-form {
    display: grid;
    gap: 0.95rem;
}
.contact-me-form label {
    color: rgba(255, 255, 255, 0.86);
    font-size: 0.82rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
}
.contact-me-form input,
.contact-me-form textarea {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.04);
    color: #ffffff;
    padding: 0.95rem 1rem;
    font: inherit;
    transition: border-color 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease;
}
.contact-me-form input::placeholder,
.contact-me-form textarea::placeholder {
    color: rgba(255, 255, 255, 0.34);
}
.contact-me-form input:hover,
.contact-me-form textarea:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(232, 217, 181, 0.24);
}
.contact-me-form input:focus,
.contact-me-form textarea:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(232, 217, 181, 0.82);
    box-shadow: 0 0 0 3px rgba(232, 217, 181, 0.15);
}
.contact-me-form textarea {
    resize: vertical;
    min-height: 10rem;
}
.contact-me-note {
    margin: 0.25rem 0 0;
    color: rgba(255, 255, 255, 0.56);
    font-size: 0.92rem;
    line-height: 1.5;
}
.contact-me-submit {
    justify-self: start;
    margin-top: 0.5rem;
    border: 1px solid rgba(232, 217, 181, 0.5);
    background: linear-gradient(135deg, rgba(232, 217, 181, 0.22), rgba(232, 217, 181, 0.1));
    color: #f7f1e1;
    padding: 0.9rem 1.4rem;
    font: inherit;
    font-size: 0.92rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    width: 100%;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background-color 0.22s ease;
}
.contact-me-submit:hover {
    transform: translateY(-1px);
    border-color: rgba(232, 217, 181, 0.9);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
    background: linear-gradient(135deg, rgba(232, 217, 181, 0.3), rgba(232, 217, 181, 0.16));
}
.contact-me-submit:focus-visible {
    outline: none;
    border-color: rgba(232, 217, 181, 1);
    box-shadow: 0 0 0 3px rgba(232, 217, 181, 0.18);
}
.contact-me-text {
    flex-basis: 60%;
}

@media (max-width: 700px) {
    .contact-me {
        padding: 5.5rem 6vw;
    }

    .contact-me-content {
        margin-top: 3rem;
    }

    .contact-me-form-shell {
        width: 100%;
        padding: 1.35rem;
    }
}
</style>
