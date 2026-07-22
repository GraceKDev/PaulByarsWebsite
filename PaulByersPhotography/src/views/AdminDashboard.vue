<script setup lang="ts">
import { onMounted, reactive, ref, Suspense } from 'vue'
import Accordion from '../components/Globals/Accordion.vue'
import PhotoGallery from '../components/AdminDashboard/PhotoGallery.vue';
import Gallerys from '../components/AdminDashboard/Gallerys.vue';
import { tempPhotos } from '../lib/temp/TemPhotos';
import type { PhotographyPhotoInterface, PhotoSetInterface } from '../lib/types/PhotographyPhotoInterface';
import { createGallery, getAllGallery, putGallery } from '../lib/api/photoset.ts';

type AdminAccordionKey = 'photo-gallery' | 'photo-set-creations'
const photoGalleryErrorMessage = reactive({
    message: '',
})
const photosErrorMessage = reactive({
    message: '',
})

const createImageFormData = reactive({
    photoTitle:'',
    photoDescription:'',
    photoLocation:'',
    photoTags: '',
    photoSetId:'',
})


const activeAccordion = ref<AdminAccordionKey | null>(null)
const gallerys = ref<PhotoSetInterface[]>([])
const photos = ref<PhotographyPhotoInterface[]>(tempPhotos.map((photo) => ({ ...photo })))
const isAccordionLoading = ref(true)
const isCreateImageModalOpen = ref(false)

onMounted(async () => {
    await refreshGalleries()
})

const isRenameModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isCreateModalOpen = ref(false)
const editingGalleryId = ref<string | null>(null)
const editingGalleryName = ref('')

const setAccordionOpen = (key: AdminAccordionKey, isOpen: boolean) => {
    activeAccordion.value = isOpen ? key : null
}

const refreshGalleries = async () => {
    isAccordionLoading.value = true
    try {
        gallerys.value = await getAllGallery(photoGalleryErrorMessage)
    } catch (error) {
        photoGalleryErrorMessage.message = 'Unable to load galleries.'
        console.error(error)
    } finally {
        isAccordionLoading.value = false
    }
}

const openDeleteModal = (gallery: PhotoSetInterface) => {
    editingGalleryId.value = gallery.photoSetId
    isDeleteModalOpen.value = true
}

const openCreateModal = () => {
    editingGalleryId.value = null
    editingGalleryName.value = ''
    isCreateModalOpen.value = true
}

const openRenameModal = (gallery: PhotoSetInterface) => {
    editingGalleryId.value = gallery.photoSetId
    editingGalleryName.value = gallery.photoSetTitle
    isRenameModalOpen.value = true
}

const closeCreateModal = () => {
    isCreateModalOpen.value = false
    editingGalleryId.value = null
    editingGalleryName.value = ''
}
const closeRenameModal = () => {
    isRenameModalOpen.value = false
    editingGalleryId.value = null
    editingGalleryName.value = ''
}

const saveGalleryName = async () => {
    const trimmedName = editingGalleryName.value.trim()
    if (!editingGalleryId.value || !trimmedName) {
        return
    }

    const response = await putGallery({ photoSetTitle: trimmedName }, editingGalleryId.value, photoGalleryErrorMessage)

    if (response) {
        await refreshGalleries()
        closeRenameModal()
    }
}

const createGallerySubmit = async () => {
    const trimmedName = editingGalleryName.value.trim()
    if (!trimmedName) {
        return
    }
    const response = await createGallery({ photoSetTitle: trimmedName }, photoGalleryErrorMessage)
    if (response) {
        await refreshGalleries()
        closeCreateModal()
    }
    else {
        console.error('Failed to create gallery:', photoGalleryErrorMessage.message)
    }

}

const createImageModalSubmit = async () => {

}

const closeImageCreateModal = () => {
    isCreateImageModalOpen.value = false
    createImageFormData.photoTitle = ''
    createImageFormData.photoDescription = ''
    createImageFormData.photoLocation = ''
    createImageFormData.photoTags = ''
    createImageFormData.photoSetId = ''
}

</script>
<template>
    <section class="admin-dashboard">
        <div class="admin-dashboard-inner">
            <div class="admin-dashboard-header">
                <h1 class="admin-dashboard-heading">Admin Dashboard</h1>
                <div class="admin-dashboard-divider"></div>
            </div>
            <div class="admin-dashboard-content">
                <div class="admin-dashboard-section">
                    <h2 class="admin-dashboard-section-heading">Manage Content</h2>
                    <Suspense>
                        <Accordion title="Gallerys" :active="activeAccordion === 'photo-set-creations'"
                            :set-active="(isOpen) => setAccordionOpen('photo-set-creations', isOpen)"
                            :loading="isAccordionLoading"
                            loading-label="Loading galleries...">
                            <Gallerys :error-message="photoGalleryErrorMessage.message" :gallerys="gallerys"
                                @edit-gallery-name="openRenameModal" @delete-gallery="openDeleteModal"
                                @create-gallery="openCreateModal" />
                        </Accordion>
                        <template #fallback>
                            <div class="accordion-loading-state">
                                <div class="accordion-spinner" aria-hidden="true"></div>
                                <span>Loading galleries...</span>
                            </div>
                        </template>
                    </Suspense>
                    <Suspense>
                        <Accordion title="Photo Gallery" :active="activeAccordion === 'photo-gallery'"
                            :set-active="(isOpen) => setAccordionOpen('photo-gallery', isOpen)"
                            :loading="isAccordionLoading"
                            loading-label="Loading photo gallery...">
                            <PhotoGallery :error-message="photosErrorMessage.message" :galleries="gallerys"
                                :photos="photos" />
                        </Accordion>
                        <template #fallback>
                            <div class="accordion-loading-state">
                                <div class="accordion-spinner" aria-hidden="true"></div>
                                <span>Loading photo gallery...</span>
                            </div>
                        </template>
                    </Suspense>
                </div>
            </div>
        </div>
        <div v-if="isCreateModalOpen" class="modal-backdrop" @click.self="closeCreateModal">
            <div class="create-modal" role="dialog" aria-modal="true" aria-label="Create gallery">
                <h3 class="modal-title">Create Gallery</h3>
                <p class="modal-error-message">{{ photoGalleryErrorMessage.message }}</p>
                <label class="modal-label" for="gallery-name-input">Gallery name</label>
                <input id="gallery-name-input" v-model="editingGalleryName" class="create-modal-input" type="text"
                    autocomplete="off" @keyup.enter="createGallerySubmit" />
                <div class="modal-actions">
                    <button type="button" class="modal-button secondary"
                        @click="closeCreateModal">Cancel</button>
                    <button type="button" class="modal-button primary"
                        @click="createGallerySubmit">Create</button>
                </div>
            </div>
        </div>
        <div v-if="isRenameModalOpen" class="modal-backdrop" @click.self="closeRenameModal">
            <div class="rename-modal" role="dialog" aria-modal="true" aria-label="Edit gallery name">
                <h3 class="modal-title">Edit Gallery Name</h3>
                <label class="modal-label" for="gallery-name-input">Gallery name</label>
                <input id="gallery-name-input" v-model="editingGalleryName" class="rename-modal-input" type="text"
                    autocomplete="off" @keyup.enter="saveGalleryName" />
                <div class="modal-actions">
                    <button type="button" class="modal-button secondary"
                        @click="closeRenameModal">Cancel</button>
                    <button type="button" class="modal-button primary" @click="saveGalleryName">Save</button>
                </div>
            </div>
        </div>

         <!-- <div v-if="isCreateImageModalOpen" class="modal-backdrop" @click.self="closeImageCreateModal">
            <div class="create-image-modal" role="dialog" aria-modal="true" aria-label="Create image">
                <h3 class="create-image-modal-title">Create Image</h3>
                <form class="create-image-modal-form" @submit.prevent="createImageModalSubmit"> 
                    <label class="create-image-modal-label" for="image-name-input">Image Title</label>
                    <input id="image-name-input" v-model="createImageFormData.photoTitle" class="create-image-modal-input" type="text"
                        autocomplete="off" @keyup.enter="createImageModalSubmit" />
                    <label class="create-image-modal-label" for="image-description-input">Image Description</label>
                    <textarea id="image-description-input" v-model="createImageFormData.photoDescription" class="create-image-modal-textarea" type="text"
                        autocomplete="off" @keyup.enter="createImageModalSubmit" />
                    <label class="create-image-modal-label" for="image-location-input">Image Location</label>
                    <input id="image-location-input" v-model="createImageFormData.photoLocation" class="create-image-modal-input" type="text"
                        autocomplete="off" @keyup.enter="createImageModalSubmit" />
                    <label class=""create-image-modal-label" for="image-tags-input">Image Tags </label>
                    
                    <div class="create-image-modal-actions">
                        <button type="button" class="create-image-modal-button secondary"
                            @click="closeImageCreateModal">Cancel</button>
                        <button type="button" class="create-image-modal-button primary" @click="createImageModalSubmit">Create</button>
                    </div>
                </form>
            </div>
        </div> -->

    </section>
</template>
<style scoped>
.admin-dashboard {
    background: radial-gradient(circle at top, #000000, #1a1a1a);
    width: 100%;
    padding: 7rem 8vw;
    box-sizing: border-box;
    min-height: 100vh;
}

.admin-dashboard-inner {
    max-width: 1400px;
    margin: 0 auto;
    flex-direction: column;
    min-height: calc(100vh - 14rem);
    display: flex;
}

.admin-dashboard-heading {
    font-size: clamp(2rem, 4.5vw, 3.25rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #ffffff;
    margin: 0 0 0.5rem;
}

.admin-dashboard-divider {
    width: 100%;
    height: 1px;
    background: rgba(232, 217, 181, 0.28);
    margin: 0rem 0 2.5rem;
}

.admin-dashboard-section {
    background: rgba(255, 255, 255, 0.08);
    padding: 2rem;
    margin-bottom: 4rem;
    color: #e8d9b5;
    flex-direction: column;
    display: flex;
    gap: 1rem;
}

.admin-dashboard-section-heading {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0 0 0.5rem;
}

.admin-dashboard-section-description {
    font-size: 1rem;
    margin: 0;
}

.modal-error-message {
    color: #ff4d4f;
    font-size: 0.9rem;
    margin: 0 0 0.75rem;
}

.accordion-loading-state {
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

.modal {
    width: min(100%, 28rem);
    border: 1px solid rgba(232, 217, 181, 0.35);
    border-radius: 0.9rem;
    background: #141414;
    color: #ffffff;
    padding: 1rem;
    box-shadow: 0 22px 45px rgba(0, 0, 0, 0.45);
}

.modal-title {
    margin: 0 0 0.75rem;
    font-size: 1.15rem;
}

.modal-label {
    display: block;
    margin-bottom: 0.45rem;
    font-size: 0.84rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(232, 217, 181, 0.9);
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.65rem;
    margin-top: 1rem;
}

.modal-button {
    border-radius: 0.6rem;
    padding: 0.5rem 0.85rem;
    border: 1px solid transparent;
    cursor: pointer;
    font-weight: 600;
}

.modal-button.secondary {
    background: rgba(255, 255, 255, 0.09);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
}

.modal-button.primary {
    background: #e8d9b5;
    color: #0f0f0f;
    border-color: #e8d9b5;
}

.delete-modal-title {
    margin: 0 0 0.75rem;
    font-size: 1.15rem;
}

.delete-modal-message {
    margin: 0 0 1rem;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.85);
}

.delete-modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.65rem;
    margin-top: 1rem;
}

.delete-modal-button {
    border-radius: 0.6rem;
    padding: 0.5rem 0.85rem;
    border: 1px solid transparent;
    cursor: pointer;
    font-weight: 600;
}

.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
    padding: 1rem;
    z-index: 1100;
}

@keyframes accordion-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>