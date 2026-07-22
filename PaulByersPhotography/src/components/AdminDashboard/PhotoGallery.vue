<script lang="ts" setup>
import { computed, ref } from 'vue'
import PhotoGalleryGrid from './PhotoGalleryGrid.vue'
import type { PhotographyPhotoInterface, PhotoSetInterface } from '../../lib/types/PhotographyPhotoInterface.ts';
const props = defineProps<{
    galleries: Array<PhotoSetInterface | null>
    photos: Array<PhotographyPhotoInterface>
    errorMessage?:string
}>()

const emit = defineEmits<{
    (event: 'create-photo'): void
}>()

console.log('props.galleries:', props.galleries)
const selectedPhotoSet = ref(props.galleries.length > 0 ? props.galleries[0]?.photoSetTitle : 'Select a photo set')

const selectedPhotoSetLabel = computed(() => {
    const gallery = props.galleries.find(g => g?.photoSetTitle === selectedPhotoSet.value)
    if (gallery) {
        return gallery.photoSetTitle
    }

    return 'Select a photo set'
})

const onCreatePhoto = () => {
    emit('create-photo')
}
</script>

<template>
    <div class="photo-gallery">
        <div class="photo-gallery-header">
            <div class="photo-gallery-header-top">
                <h3>Photo Gallery Config</h3>
            </div>
            <p>Select a gallery to edit and update its settings.</p>
            <p>{{props.errorMessage}}</p>
        </div>
        <div class="photo-gallery-content">
            <div class="photo-set-selector-container">
                <select v-model="selectedPhotoSet" class="photo-set-selector">
                    <option
                        v-for="gallery in galleries"
                        :key="gallery?.photoSetId"
                        :value="gallery?.photoSetTitle"
                    >
                        {{ gallery?.photoSetTitle }}
                    </option>
                </select>
            </div>
            <p class="photo-set-selected">Selected: {{ selectedPhotoSetLabel }}</p>
            <button class="photo-add-button" type="button" @click="onCreatePhoto">
                <span class="photo-add-icon" aria-hidden="true">+</span>
                <span>Add photo</span>
            </button>
            <div class="photo-set-body">
                <PhotoGalleryGrid :photos="photos" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.photo-gallery {
    padding: 1rem;
}

.photo-gallery-header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.photo-add-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    max-width: 14rem;
    padding: 0.9rem 1rem;
    border: 1px solid rgba(0, 255, 0, 0.45);
    border-radius: 0.8rem;
    background: rgba(0, 255, 0, 0.16);
    color: #00ff00;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: transform 0.18s ease, background-color 0.18s ease;
}

.photo-add-button:hover,
.photo-add-button:focus-visible {
    transform: translateY(-1px);
    background: rgba(0, 255, 0, 0.24);
    outline: none;
}

.photo-add-icon {
    font-size: 1.2rem;
    line-height: 1;
}

.photo-set-body {
    margin-top: 1.25rem;
}

.photo-set-selected {
    margin: 0.75rem 0 0;
    text-align: right;
    color: rgba(232, 217, 181, 0.9);
    font-size: 0.95rem;
}

.photo-set-selector-container {
    display: flex;
    justify-content: flex-end;
}

.photo-set-selector {
    min-width: 14rem;
    padding: 0.7rem 1rem;
    color: #000;
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

.photo-set-selector:hover,
.photo-set-selector:focus-visible {
    border-color: rgba(232, 217, 181, 0.9);
    box-shadow: 0 0 0 3px rgba(232, 217, 181, 0.2);
    outline: none;
    transform: translateY(-1px);
}

p {
    margin: 0;
}

h3 {
    margin: 0;
}
</style>