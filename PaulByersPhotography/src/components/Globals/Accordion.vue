<script lang="ts" setup>
const props = defineProps<{
    title: string
    active: boolean
    setActive: (active: boolean) => void
    content?: string
}>()
</script>

<template>
    <div class="accordion">
        <button class="accordion-trigger" type="button" @click="props.setActive(!props.active)"
            :aria-expanded="props.active">
            <h3 class="accordion-title">{{ props.title }}</h3>
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
                <slot>
                    {{ props.content }}
                </slot>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.accordion-trigger {
    border: 1px solid rgba(232, 217, 181, 0.2);
    width: 100%;
    padding: 0.5rem;
    background: transparent;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
    text-align: left;
}

.accordion-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
}

.accordion-chevron {
    flex-shrink: 0;
    transition: transform 0.28s ease;
}
.accordion-chevron-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid rgba(232, 217, 181, 0.2);
}
.accordion-chevron.is-open {
    transform: rotate(180deg);
}

.accordion-content {
    padding: 0 0 1rem;
    overflow: hidden;
    height: 100%;
}

.accordion-content-transition-enter-active,
.accordion-content-transition-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.accordion-content-transition-enter-from,
.accordion-content-transition-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>