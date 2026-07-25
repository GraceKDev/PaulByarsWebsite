<script lang="ts" setup>
import { computed, ref } from 'vue'
import PhotoGalleryGrid from './PhotoGalleryGrid.vue'
import type { PhotographyPhotoInterface, PhotoSetInterface } from '../../lib/types/PhotographyPhotoInterface.ts';
import Dropdown from '../Globals/Dropdown.vue';
const props = defineProps<{
    galleries: PhotoSetInterface[]
    photos: PhotographyPhotoInterface[]
    errorMessage?: string
    editingEnabled:boolean
}>()

const emit = defineEmits<{
    (event: 'create-photo'): void
    (event: 'edit-photo', photo: PhotographyPhotoInterface): void
    (event: 'delete-photo', photo: PhotographyPhotoInterface): void
}>()

console.log('props.galleries:', props.galleries)
const selectedPhotoSet = ref(props.galleries.length > 0 ? props.galleries[0]?.photoSetTitle : 'Select a photo set')

const galleryOptions = computed(() =>
  props.galleries.map((g) => ({
    label: g.photoSetTitle,
    value: g.photoSetTitle,
  }))
);

const selectedPhotoSetLabel = computed(() => {
    const gallery = props.galleries.find(g => g?.photoSetTitle === selectedPhotoSet.value)
    if (gallery) {
        return gallery.photoSetTitle
    }

    return 'Select a photo set'
})



</script>

<template>
    <div class="photo-gallery">
        <div class="photo-gallery-header">
            <div class="photo-gallery-header-top">
                <h3>Photo Gallery Configuration</h3>
            </div>
            <p>Select a gallery below to manage its photos.</p>
            <p>{{ props.errorMessage }}</p>
        </div>
        <div class="photo-gallery-content">
            <div class="photo-set-selector-container">
                <Dropdown id="filter" label="Gallerys" :options="galleryOptions" v-model="selectedPhotoSet" />
            </div>
            <p class="photo-set-selected">Selected: {{ selectedPhotoSetLabel }}</p>
            <div class="photo-set-body">
                <PhotoGalleryGrid :photos="photos" :editing-enabled="props.editingEnabled" @create-photo="emit('create-photo')"
                    @edit-photo="(photo) => emit('edit-photo', photo)"
                    @delete-photo="(photo) => emit('delete-photo', photo)" />
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



.photo-set-selector-container {
    display: flex;
    justify-content: flex-end;
}



p {
    margin: 0;
}

h3 {
    margin: 0;
}
</style>