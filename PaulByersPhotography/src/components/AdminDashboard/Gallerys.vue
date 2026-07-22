<script lang="ts" setup>
import type { PhotoSetInterface } from '../../lib/types/PhotographyPhotoInterface';

const props = defineProps<{
    gallerys: Array<PhotoSetInterface>
    errorMessage?: string
}>()
console.log(props.gallerys)
const emit = defineEmits<{
    (event: 'edit-gallery-name', gallery: PhotoSetInterface): void
    (event: 'delete-gallery', gallery: PhotoSetInterface): void
    (event: 'create-gallery'): void
}>()

const onEditGalleryName = (gallery: PhotoSetInterface | null) => {
    if (gallery) {
        emit('edit-gallery-name', gallery)
    }
}

const onDeleteGallery = (gallery: PhotoSetInterface | null) => {
    if (gallery) {
        emit('delete-gallery', gallery)
    }
}

const onCreateGallery = () => {
    emit('create-gallery')
}
</script>
<template>
    <div class="gallerys">
        <div class="gallerys-header">
            <h3> Photo Gallerys Configuration </h3>
            <p> Select a gallery to configure its settings </p>
            <p> {{ props.errorMessage }}</p>
        </div>
        <div class="gallerys-list">
            <div class="gallery-item-header"> 
                <button class="gallery-item-button add" type="button" @click="onCreateGallery">New Gallery</button>
            </div>
            <template v-if="!props.gallerys || props.gallerys.length === 0">
                <p>No galleries available.</p>
            </template>
            <template v-else>
                <div v-for="gallery in props.gallerys" :key="gallery.photoSetId" class="gallery-item">
                    <h4 class="galleryPhotoSetTitle">{{ gallery.photoSetTitle }}</h4>
                    <div class="gallery-item-button-container"> 
                        <button class="gallery-item-button" type="button" @click="onEditGalleryName(gallery)" aria-label="Edit gallery">
                            <span class="action-icon" aria-hidden="true">✎</span>
                            <span>Edit</span>
                        </button>
                        <button class="gallery-item-button delete" type="button" @click="onDeleteGallery(gallery)" aria-label="Delete gallery">
                            <span class="action-icon" aria-hidden="true">🗑</span>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </template>
        </div>

       
    </div>
</template>
<style scoped>
.gallerys-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.gallery-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.8rem 0.95rem;
    border: 1px solid rgba(232, 217, 181, 0.2);
    background: rgba(255, 255, 255, 0.04);
}

.galleryPhotoSetTitle {
    margin: 0;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 500;
}
.gallery-item-header {
    display:flex;
    justify-content: flex-end;
    margin-bottom: 0.75rem;
}
.gallery-item-button {
    border: 1px solid rgba(232, 217, 181, 0.5);
    background: rgba(232, 217, 181, 0.15);
    color: #e8d9b5;
    padding: 0.45rem 0.75rem;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    transition: background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
}

.action-icon {
    font-size: 0.95rem;
    line-height: 1;
}

.gallery-item-button-container {
    display: flex;
    gap: 0.5rem;
}

.gallery-item-button:hover,
.gallery-item-button:focus-visible {
    background: #e8d9b5;
    color: #0f0f0f;
    border-color: #e8d9b5;
    outline: none;
    transform: translateY(-1px);
}

.gallery-item-button.delete {
    background: rgba(255, 0, 0, 0.15);
    color: #ff0000;
    border-color: rgba(255, 0, 0, 0.5);
}
.gallery-item-button.add {
    background: rgba(0, 255, 0, 0.15);
    color: #00ff00;
    border-color: rgba(0, 255, 0, 0.5);
}

.gallery-item-button.add:hover,
.gallery-item-button.add:focus-visible {
    background: #00ff00;
    color: #0f0f0f;
    border-color: #00ff00;
    outline: none;
    transform: translateY(-1px);
}

.gallery-item-button.delete:hover,
.gallery-item-button.delete:focus-visible {
    background: #ff0000;
    color: #ffffff;
    border-color: #ff0000;
    outline: none;
    transform: translateY(-1px);
}
</style>