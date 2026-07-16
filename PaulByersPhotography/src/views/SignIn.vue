<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { UserInterface } from '../lib/types/PhotographyPhotoInterface';

const router = useRouter();

const signInForm = reactive({
    email: '',
    password: '',
});

const errorMessage = reactive({
    message: '',
});
const handleSubmit = async() => {
    try{
        const body:UserInterface = {
            UserEmail: signInForm.email,
            UserPassword: signInForm.password
        }
        console.log(body)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body),
        });
        if(!response.ok){
            errorMessage.message = `${response.statusText}`;
            return;
        }

        errorMessage.message = '';
        await router.push('/admin');
    }
    catch(error){
        console.error('Error signing in:', error);
        errorMessage.message = 'Unable to sign in. Please try again.';
    }
};
</script>
<template>
    <section class="sign-in" aria-label="Sign In">
        <div class="sign-in-inner">
            <header class="section-header">
                <p class="section-eyebrow">Sign In</p>
                <h2 class="section-heading">Sign In</h2>
                <div class="section-divider"></div>
            </header>
            <div class="sign-in-content">
                <div class="sign-in-form-shell">
                    <div>
                        <h2 class="sign-in-form-heading">Sign in</h2>
                        <p class="sign-in-error-message">{{ errorMessage.message }}</p>
                    </div>
                    <form class="sign-in-form" @submit.prevent="handleSubmit">
                        <label aria-label="Email" for="email">Email</label>
                        <input v-model="signInForm.email" type="email" id="email" name="email" autocomplete="email"
                            required />

                        <label aria-label="Password" for="password">Password</label>
                        <input v-model="signInForm.password" type="password" id="password" name="password"
                            autocomplete="current-password" required />

                        <button class="sign-in-submit" type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>

    </section>
</template>
<style scoped>
.sign-in {
    width: 100%;
    min-height: 100vh;
    padding: 7rem 8vw;
    background: radial-gradient(circle at top, #000000, #1a1a1a);
    color: #e8d9b5;
}

.sign-in-inner {
    max-width: 1400px;
    margin: 0 auto;
    flex-direction: column;
    min-height: calc(100vh - 14rem);
    display: flex;
}

.section-eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.48rem;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.28);
    margin: 0 0 0.85rem;
}

.section-heading {
    font-size: clamp(2rem, 4.5vw, 3.25rem);
    font-weight: 500;
    letter-spacing: -0.025em;
    color: #ffffff;
    margin: 0;
}

.section-divider {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
    margin: 2.5rem 0 0;
}

.sign-in-content {
    width: 100%;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
}

.sign-in-form-shell {
    max-width: 400px;
    width: 100%;
    min-height: 100%;
    transform: translateY(-6rem);
}


.sign-in-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 400px;
    margin: 0 auto;
}

.sign-in-form-heading {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 1rem;
}
.sign-in-error-message {
    color: #ff0000;
    font-size: 0.9rem;
    text-align: center;
    font-style:italic;
}

.sign-in-form label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.75);
}

.sign-in-form input {
    padding: 0.75rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.05);
    color: #ffffff;
}

.sign-in-submit {
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #e8d9b5;
    color: #000000;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.sign-in-submit:hover {
    background-color: #f5e6c0;
}
</style>