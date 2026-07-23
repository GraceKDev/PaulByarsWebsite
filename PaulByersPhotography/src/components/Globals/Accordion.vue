<script lang="ts" setup>
const props = defineProps<{
    title: string
    subTitle?: string
    active: boolean
    setActive: (active: boolean) => void
    content?: string
    loading?: boolean
    loadingLabel?: string
}>()
</script>

<template>
    <div class="accordion">
        <button class="accordion-trigger" type="button" @click="props.setActive(!props.active)"
            :aria-expanded="props.active">
            <div class="accordion-title-container">
                <div class="accordion-title-text-container">
                    <h3 class="accordion-title">{{ props.title }}</h3>
                    <span class="accordion-divider"> | </span>
                </div>
                <p class="accordion-subtitle">{{ props.subTitle }}</p>
            </div>
            <div class="accordion-chevron-container">
                <svg class="accordion-chevron" :class="{ 'is-open': props.active }" width="18" height="18"
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </button>

        <Transition name="accordion-content-transition">
            <div v-if="props.active" class="accordion-content">
                <div v-if="props.loading" class="accordion-loading" role="status" aria-live="polite">
                    <div class="accordion-spinner" aria-hidden="true"></div>
                    <span>{{ props.loadingLabel || 'Loading...' }}</span>
                </div>
                <slot v-else>
                    {{ props.content }}
                </slot>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.accordion {
    margin-bottom: 0.75rem;
}

.accordion-trigger {
    border: 1px solid rgba(232, 217, 181, 0.25);
    border-radius: 0.5rem;
    width: 100%;
    padding: 1.25rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.22s ease, border-color 0.22s ease;
}

.accordion-trigger:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(232, 217, 181, 0.4);
}

.accordion-title-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
}

.accordion-title-text-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.accordion-title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: #e8d9b5;
}

.accordion-divider {
    color: rgba(232, 217, 181, 0.35);
    font-size: 1.2rem;
    line-height: 1;
}

.accordion-subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: rgba(232, 217, 181, 0.6);
}

.accordion-chevron-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(232, 217, 181, 0.08);
    flex-shrink: 0;
    transition: background-color 0.22s ease;
}

.accordion-trigger:hover .accordion-chevron-container {
    background: rgba(232, 217, 181, 0.14);
}

.accordion-chevron {
    flex-shrink: 0;
    transition: transform 0.28s ease;
}

.accordion-chevron.is-open {
    transform: rotate(180deg);
}

.accordion-content {
    padding: 1.25rem 1.5rem 1.5rem;
    overflow: hidden;
    border-left: 1px solid rgba(232, 217, 181, 0.15);
    border-right: 1px solid rgba(232, 217, 181, 0.15);
    border-bottom: 1px solid rgba(232, 217, 181, 0.15);
    border-radius: 0 0 0.5rem 0.5rem;
    background: rgba(255, 255, 255, 0.02);
}

.accordion-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1.25rem 0;
    color: #e8d9b5;
}

.accordion-spinner {
    width: 1.1rem;
    height: 1.1rem;
    border: 2px solid rgba(232, 217, 181, 0.25);
    border-top-color: #e8d9b5;
    border-radius: 50%;
    animation: accordion-spin 0.8s linear infinite;
}

@keyframes accordion-spin {
    to {
        transform: rotate(360deg);
    }
}

.accordion-content-transition-enter-active,
.accordion-content-transition-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.accordion-content-transition-enter-from,
.accordion-content-transition-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>