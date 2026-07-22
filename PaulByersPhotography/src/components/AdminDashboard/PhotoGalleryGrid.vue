<script lang="ts" setup>
import { ref } from 'vue';
import type { PhotographyPhotoInterface } from '../../lib/types/PhotographyPhotoInterface'
const props = defineProps<{
    photos: Array<PhotographyPhotoInterface>
}>()
const editMode = ref(false)
const deleteModal = ref(false)
const photoModal = ref(false)

const selectedPhoto = ref<PhotographyPhotoInterface | null>(null)

const openDeleteModal = (photo: PhotographyPhotoInterface) => {
    selectedPhoto.value = photo
    deleteModal.value = true
}

const closeDeleteModal = () => {
    deleteModal.value = false
    selectedPhoto.value = null
}

const deletePhoto = (photo: PhotographyPhotoInterface) => {
    console.log("deleting photo:", photo)
    closeDeleteModal()
}

const openPhotoModal = (photo: PhotographyPhotoInterface) => {
    photoModal.value = true
    selectedPhoto.value = photo 
}
const closePhotoModal = () => {
    photoModal.value = false
    selectedPhoto.value = null
}


</script>

<template>
    <div class="photo-gallery-grid">
        <div v-if="editMode" class="photo-gallery-item add-photo">
            <div class="add-photo-icon">
                <p class="add-photo-text"> Add Photo</p>
            </div>
        </div>
        <div v-for="photo in props.photos" :key="photo.photoId" class="photo-gallery-item">
            <div class="photo-gallery-item-content">
                <div class="photo-gallery-item-overlay">

                    <div v-if="editMode" class="photo-gallery-delete" @click.stop="openDeleteModal(photo)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                    <img @click="openPhotoModal(photo)" :src="photo.photoUrl" :alt="photo.photoAlt" />
                </div>
            </div>
        </div>
        <div v-if="photoModal && selectedPhoto" class="photo-inspect-modal" @click="closePhotoModal">
            <div class="photo-inspect-modal-content" @click.stop>
                <img :src="selectedPhoto.photoUrl" :alt="selectedPhoto.photoAlt" />
            </div>
        </div>

        <div v-if="deleteModal && selectedPhoto" class="photo-inspect-modal" @click="closeDeleteModal">
            <div class="photo-inspect-modal-content" @click.stop>
                <p>Are you sure you want to delete this photo?</p>
                <button class="cancel-button" @click="closeDeleteModal">Cancel</button>
                <button class="delete-button" @click="deletePhoto(selectedPhoto)">Delete</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.photo-gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}

@media (max-width: 1024px) {
    .photo-gallery-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 640px) {
    .photo-gallery-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1 / 1;
}

.photo-gallery-item {
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease;
}

.photo-gallery-item-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.photo-gallery-item:hover {
    border-radius: 0.5rem;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.photo-gallery-grid .add-photo {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(232, 217, 181, 0.1);
    border: 2px dashed rgba(232, 217, 181, 0.5);
    cursor: pointer;
}

.photo-gallery-delete {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: rgba(231, 0, 0, 1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid rgb(112, 1, 1);
    transition: transform 0.2s ease;
}

.photo-gallery-delete:hover {
    transform: scale(1.2);
}

.photo-inspect-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
.photo-inspect-modal-content {
    max-width: 90%;
    max-height: 90%;
}
.photo-inspect-modal-content img {
    width: 100%;
    height: auto;
}
.photo-inspect-modal-content p {
    color: #fff;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}
.cancel-button,
.delete-button {
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease, color 0.2s ease;
}
.cancel-button {
    background-color: #ccc;
    color: #000;
}
.cancel-button:hover {
    background-color: #bbb;
}
.delete-button {
    background-color: #e70000;
    color: #fff;
}
.delete-button:hover {
    background-color: #c60000;
}

.add-photo-text {
    color: rgba(232, 217, 181, 0.9);
    font-size: 1rem;
    font-weight: 500;
}
</style>