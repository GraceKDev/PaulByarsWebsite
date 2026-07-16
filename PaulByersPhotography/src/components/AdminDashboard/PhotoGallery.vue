<script lang="ts" setup>
import { computed, ref } from 'vue'
import PhotoGalleryGrid from './PhotoGalleryGrid.vue'
import type { PhotographyPhotoInterface, PhotoSetInterface } from '../../lib/types/PhotographyPhotoInterface.ts';
const props = defineProps<{
    galleries: Array<PhotoSetInterface>
    photos: Array<PhotographyPhotoInterface>
}>()

console.log('props.galleries:', props.galleries)
const selectedPhotoSet = ref(props.galleries.length > 0 ? props.galleries[0].PhotoSetTitle : 'Select a photo set')

const selectedPhotoSetLabel = computed(() => {
    const gallery = props.galleries.find(g => g.PhotoSetTitle === selectedPhotoSet.value)
    if (gallery) {
        return gallery.PhotoSetTitle
    }

    return 'Select a photo set'
})
</script>

<template>
    <div class="photo-gallery">
        <div class="photo-gallery-header">
            <h3>Photo Gallery Config</h3>
            <p>Select a gallery to edit and update its settings.</p>
        </div>
        <div class="photo-gallery-content">
            <div class="photo-set-selector-container">
                <select v-model="selectedPhotoSet" class="photo-set-selector">
                    <option
                        v-for="gallery in galleries"
                        :key="gallery.PhotoSetId"
                        :value="gallery.PhotoSetTitle"
                    >
                        {{ gallery.PhotoSetTitle }}
                    </option>
                </select>
            </div>
            <p class="photo-set-selected">Selected: {{ selectedPhotoSetLabel }}</p>
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