<script setup lang="ts">
import { ref } from 'vue'
import Accordion from '../components/Globals/Accordion.vue'
import PhotoGallery from '../components/AdminDashboard/PhotoGallery.vue';
import Gallerys from '../components/AdminDashboard/Gallerys.vue';
import { tempGallerys } from '../lib/temp/TemGallery';
import {tempPhotos} from '../lib/temp/TemPhotos';
import type { PhotographyPhotoInterface, PhotoSetInterface } from '../lib/types/PhotographyPhotoInterface';

type AdminAccordionKey = 'photo-gallery' | 'photo-set-creations'

const activeAccordion = ref<AdminAccordionKey | null>(null)
const gallerys = ref<PhotoSetInterface[]>(tempGallerys.map((gallery) => ({ ...gallery })))
const photos = ref<PhotographyPhotoInterface[]>(tempPhotos.map((photo) => ({ ...photo })))

const isRenameModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isCreateModalOpen = ref(false)
const editingGalleryId = ref<string | null>(null)
const editingGalleryName = ref('')

const setAccordionOpen = (key: AdminAccordionKey, isOpen: boolean) => {
    activeAccordion.value = isOpen ? key : null
}


const openDeleteModal = (gallery: PhotoSetInterface) => {
    editingGalleryId.value = gallery.PhotoSetId
    isDeleteModalOpen.value = true
}

const openCreateModal = () => {
    editingGalleryId.value = null
    editingGalleryName.value = ''
    isCreateModalOpen.value = true
}

const openRenameModal = (gallery: PhotoSetInterface) => {
    editingGalleryId.value = gallery.PhotoSetId
    editingGalleryName.value = gallery.PhotoSetTitle
    isRenameModalOpen.value = true
}



const closeCreateModal = () => {
    isCreateModalOpen.value = false
    editingGalleryId.value = null
    editingGalleryName.value = ''
}
const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
    editingGalleryId.value = null
}

const closeRenameModal = () => {
    isRenameModalOpen.value = false
    editingGalleryId.value = null
    editingGalleryName.value = ''
}

const saveGalleryName = () => {
    const trimmedName = editingGalleryName.value.trim()
    if (!editingGalleryId.value || !trimmedName) {
        return
    }

    const galleryIndex = gallerys.value.findIndex((gallery) => gallery.PhotoSetId === editingGalleryId.value)
    if (galleryIndex === -1) {
        return
    }

    gallerys.value[galleryIndex] = {
        ...gallerys.value[galleryIndex],
        PhotoSetTitle: trimmedName,
    }

    closeRenameModal()
}

const createGallery = () => {
    const trimmedName = editingGalleryName.value.trim()
    if (!trimmedName) {
        return
    }

    const maxId = gallerys.value.reduce((max, gallery) => {
        const numericId = Number(gallery.PhotoSetId)
        if (Number.isNaN(numericId)) {
            return max
        }
        return Math.max(max, numericId)
    }, 0)

    gallerys.value.push({
        PhotoSetId: String(maxId + 1),
        PhotoSetTitle: trimmedName,
    })

    closeCreateModal()
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
                    <Accordion
                        title="Gallerys"
                        :active="activeAccordion === 'photo-set-creations'"
                        :set-active="(isOpen) => setAccordionOpen('photo-set-creations', isOpen)"
                    >
                        <Gallerys :gallerys="gallerys" @edit-gallery-name="openRenameModal" @delete-gallery="openDeleteModal" @create-gallery="openCreateModal"/>
                    </Accordion>
                    <Accordion
                        title="Photo Gallery"
                        :active="activeAccordion === 'photo-gallery'"
                        :set-active="(isOpen) => setAccordionOpen('photo-gallery', isOpen)"
                    >
                        <PhotoGallery :galleries="gallerys" :photos="photos" />
                    </Accordion>

                    
                </div>
            </div>
        </div>
        <div v-if="isCreateModalOpen" class="create-modal-backdrop" @click.self="closeCreateModal">
            <div class="create-modal" role="dialog" aria-modal="true" aria-label="Create gallery">
                <h3 class="create-modal-title">Create Gallery</h3>
                <label class="create-modal-label" for="gallery-name-input">Gallery name</label>
                <input
                    id="gallery-name-input"
                    v-model="editingGalleryName"
                    class="create-modal-input"
                    type="text"
                    autocomplete="off"
                    @keyup.enter="createGallery"
                />
                <div class="create-modal-actions">
                    <button type="button" class="create-modal-button secondary" @click="closeCreateModal">Cancel</button>
                    <button type="button" class="create-modal-button primary" @click="createGallery">Create</button>
                </div>
            </div>
        </div>
        <div v-if="isRenameModalOpen" class="rename-modal-backdrop" @click.self="closeRenameModal">
            <div class="rename-modal" role="dialog" aria-modal="true" aria-label="Edit gallery name">
                <h3 class="rename-modal-title">Edit Gallery Name</h3>
                <label class="rename-modal-label" for="gallery-name-input">Gallery name</label>
                <input
                    id="gallery-name-input"
                    v-model="editingGalleryName"
                    class="rename-modal-input"
                    type="text"
                    autocomplete="off"
                    @keyup.enter="saveGalleryName"
                />
                <div class="rename-modal-actions">
                    <button type="button" class="rename-modal-button secondary" @click="closeRenameModal">Cancel</button>
                    <button type="button" class="rename-modal-button primary" @click="saveGalleryName">Save</button>
                </div>
            </div>
        </div>

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
    display:flex;
    gap:1rem;
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

.rename-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
    padding: 1rem;
    z-index: 1100;
}

.rename-modal {
    width: min(100%, 28rem);
    border: 1px solid rgba(232, 217, 181, 0.35);
    border-radius: 0.9rem;
    background: #141414;
    color: #ffffff;
    padding: 1rem;
    box-shadow: 0 22px 45px rgba(0, 0, 0, 0.45);
}

.rename-modal-title {
    margin: 0 0 0.75rem;
    font-size: 1.15rem;
}

.rename-modal-label {
    display: block;
    margin-bottom: 0.45rem;
    font-size: 0.84rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(232, 217, 181, 0.9);
}

.rename-modal-input {
    width: 100%;
    padding: 0.65rem 0.75rem;
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 0.65rem;
    box-sizing: border-box;
}

.rename-modal-input:focus-visible {
    outline: none;
    border-color: rgba(232, 217, 181, 0.95);
    box-shadow: 0 0 0 3px rgba(232, 217, 181, 0.2);
}

.rename-modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.65rem;
    margin-top: 1rem;
}

.rename-modal-button {
    border-radius: 0.6rem;
    padding: 0.5rem 0.85rem;
    border: 1px solid transparent;
    cursor: pointer;
    font-weight: 600;
}

.rename-modal-button.secondary {
    background: rgba(255, 255, 255, 0.09);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
}

.rename-modal-button.primary {
    background: #e8d9b5;
    color: #0f0f0f;
    border-color: #e8d9b5;
}
.delete-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
    padding: 1rem;
    z-index: 1100;
}
.delete-modal {
    width: min(100%, 28rem);
    border: 1px solid rgba(232, 217, 181, 0.35);
    border-radius: 0.9rem;
    background: #141414;
    color: #ffffff;
    padding: 1rem;
    box-shadow: 0 22px 45px rgba(0, 0, 0, 0.45);
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
.create-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
    padding: 1rem;
    z-index: 1100;
}
.create-modal {
    width: min(100%, 28rem);
    border: 1px solid rgba(232, 217, 181, 0.35);
    border-radius: 0.9rem;
    background: #141414;
    color: #ffffff;
    padding: 1rem;
    box-shadow: 0 22px 45px rgba(0, 0, 0, 0.45);
}
.create-modal-title {
    margin: 0 0 0.75rem;
    font-size: 1.15rem;
}
.create-modal-label {
    display: block;
    margin-bottom: 0.45rem;
    font-size: 0.84rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(232, 217, 181, 0.9);
}
.create-modal-input {
    width: 100%;
    padding: 0.65rem 0.75rem;
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 0.65rem;
    box-sizing: border-box;
}
.create-modal-input:focus-visible {
    outline: none;
    border-color: rgba(232, 217, 181, 0.95);
    box-shadow: 0 0 0 3px rgba(232, 217, 181, 0.2);
}
.create-modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.65rem;
    margin-top: 1rem;
}

</style>