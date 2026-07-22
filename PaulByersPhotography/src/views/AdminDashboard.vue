<script setup lang="ts">
import { onMounted, reactive, ref, Suspense } from 'vue'
import Accordion from '../components/Globals/Accordion.vue'
import PhotoGallery from '../components/AdminDashboard/PhotoGallery.vue';
import Gallerys from '../components/AdminDashboard/Gallerys.vue';
import Tags from '../components/AdminDashboard/Tags.vue';
import { tempPhotos } from '../lib/temp/TemPhotos';
import type { PhotographyPhotoInterface, PhotoSetInterface, TagInterface } from '../lib/types/PhotographyPhotoInterface';
import { createGallery, getAllGallery, putGallery } from '../lib/api/photoset.ts';
import { createTag, getAllTags, putTag } from '../lib/api/tag.ts';

type AdminAccordionKey = 'photo-gallery' | 'photo-set-creations' | 'tags'
type DeleteModalTargetType = 'gallery' | 'tag' | 'photo'

const photoGalleryErrorMessage = reactive({
    message: '',
})
const photosErrorMessage = reactive({
    message: '',
})
const tagsErrorMessage = reactive({
    message: '',
})
const imageFormData = reactive({
    photoTitle:'',
    photoDescription:'',
    photoLocation:'',
    photoTags: [''],
    photoSetId:'',
})

const photoPreviewUrl = ref<string | null>(null)
const photoUploadInput = ref<HTMLInputElement | null>(null)

const activeAccordion = ref<AdminAccordionKey | null>(null)
const gallerys = ref<PhotoSetInterface[]>([])
const tags = ref<TagInterface[]>([])
const photos = ref<PhotographyPhotoInterface[]>(tempPhotos.map((photo) => ({ ...photo })))
const isAccordionLoading = ref(true)


onMounted(async () => {
    await refreshGalleries()
    await refreshTags()
})
const isPhotoCreateModalOpen = ref(false)
const isPhotoEditModalOpen = ref(false)
const isGalleryEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isGalleryCreateModalOpen = ref(false)
const isTagCreateModalOpen = ref(false)
const isTagEditModalOpen = ref(false)
const editingGalleryId = ref<string | null>(null)
const editingPhotoId = ref<string | null>(null)
const editingGalleryName = ref('')
const deleteModalTargetType = ref<DeleteModalTargetType>('gallery')
const deleteModalTargetName = ref('')

const setAccordionOpen = (key: AdminAccordionKey, isOpen: boolean) => {
    activeAccordion.value = isOpen ? key : null
}

const refreshTags = async () => {
    isAccordionLoading.value = true
    try {
        tags.value = await getAllTags(tagsErrorMessage)
    } catch (error) {
        tagsErrorMessage.message = 'Unable to load tags.'
        console.error(error)
    } finally {
        isAccordionLoading.value = false
    }
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

const openDeleteModal = (targetType: DeleteModalTargetType, itemId: string | null, itemName: string) => {
    deleteModalTargetType.value = targetType
    deleteModalTargetName.value = itemName
    editingGalleryId.value = itemId
    isDeleteModalOpen.value = true
}

const openGalleryDeleteModal = (gallery: PhotoSetInterface) => {
    openDeleteModal('gallery', gallery.photoSetId, gallery.photoSetTitle)
}

const openGalleryCreateModal = () => {
    editingGalleryId.value = null
    editingGalleryName.value = ''
    isGalleryCreateModalOpen.value = true
    isGalleryEditModalOpen.value = false
}

const openGalleryEditModal = (gallery: PhotoSetInterface) => {
    editingGalleryId.value = gallery.photoSetId
    editingGalleryName.value = gallery.photoSetTitle
    isGalleryEditModalOpen.value = true
    isGalleryCreateModalOpen.value = false
}

const closeGalleryCreateModal = () => {
    isGalleryCreateModalOpen.value = false
    editingGalleryId.value = null
    editingGalleryName.value = ''
}
const closeGalleryEditModal = () => {
    isGalleryEditModalOpen.value = false
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
        closeGalleryEditModal()
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
        closeGalleryCreateModal()
    }
    else {
        console.error('Failed to create gallery:', photoGalleryErrorMessage.message)
    }
}


const openTagEditModal = (tag: TagInterface) => {
    editingGalleryId.value = tag.tagId
    editingGalleryName.value = tag.tagName
    isTagEditModalOpen.value = true
    isTagCreateModalOpen.value = false
}
const openTagDeleteModal = (tag: TagInterface) => {
    openDeleteModal('tag', tag.tagId, tag.tagName)
}
const openTagCreateModal = () => {
    editingGalleryId.value = null
    editingGalleryName.value = ''
    isTagCreateModalOpen.value = true
    isTagEditModalOpen.value = false
}

const closeTagModal = () => {
    isTagCreateModalOpen.value = false
    isTagEditModalOpen.value = false
    editingGalleryId.value = null
    editingGalleryName.value = ''
}

const saveTagName = async () => {
    const trimmedName = editingGalleryName.value.trim()
    if (!trimmedName) {
        return
    }

    const response = editingGalleryId.value
        ? await putTag({ tagName: trimmedName }, editingGalleryId.value, tagsErrorMessage)
        : await createTag({ tagName: trimmedName }, tagsErrorMessage)

    if (response) {
        await refreshTags()
        closeTagModal()
    }
}

const openPhotoCreateModal = () => {
    isPhotoCreateModalOpen.value = true
    isPhotoEditModalOpen.value = false
    imageFormData.photoTitle = ''
    imageFormData.photoDescription = ''
    imageFormData.photoLocation = ''
    imageFormData.photoTags = []
    imageFormData.photoSetId = ''
    photoPreviewUrl.value = null
}

const openPhotoEditModal = (photo:PhotographyPhotoInterface) => {
    editingPhotoId.value = photo.photoId;
    imageFormData.photoTitle = photo.photoTitle;
    imageFormData.photoLocation = photo.photoLocation;
    imageFormData.photoTags = photo.photoTags;
    imageFormData.photoDescription = photo.photoDescription;
    isPhotoEditModalOpen.value = true;
    isPhotoCreateModalOpen.value = false;

}

const createImageModalSubmit = async () => {
    if (!imageFormData.photoTitle.trim()) {
        return
    }

    closePhotoModal()
}

const closePhotoModal = () => {
    isPhotoCreateModalOpen.value = false
    isPhotoEditModalOpen.value = false
    imageFormData.photoTitle = ''
    imageFormData.photoDescription = ''
    imageFormData.photoLocation = ''
    imageFormData.photoTags = []
    imageFormData.photoSetId = ''
    if (photoPreviewUrl.value) {
        URL.revokeObjectURL(photoPreviewUrl.value)
    }
    photoPreviewUrl.value = null
}

const openPhotoPicker = () => {
    photoUploadInput.value?.click()
}

const handlePhotoFileSelection = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (!file) {
        return
    }

    if (photoPreviewUrl.value) {
        URL.revokeObjectURL(photoPreviewUrl.value)
    }

    photoPreviewUrl.value = URL.createObjectURL(file)
}

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
    deleteModalTargetType.value = 'gallery'
    deleteModalTargetName.value = ''
    editingGalleryId.value = null
}

const confirmDelete = () => {
    console.log(`Deleting ${deleteModalTargetType.value}: ${deleteModalTargetName.value}`)
    closeDeleteModal()
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
                        <Accordion title="Tags" :sub-title="'Create and modify tags for photos'"  :active="activeAccordion === 'tags'"
                            :set-active="(isOpen) => setAccordionOpen('tags', isOpen)"
                            :loading="isAccordionLoading"
                            loading-label="Loading tags...">
                            <Tags :error-message="tagsErrorMessage.message" :tags="tags"
                                @edit-tag-name="openTagEditModal" @delete-tag="openTagDeleteModal"
                                @create-tag="openTagCreateModal" />
                        </Accordion>
                        <template #fallback>
                            <div class="accordion-loading-state">
                                <div class="accordion-spinner" aria-hidden="true"></div>
                                <span>Loading tags...</span>
                            </div>
                        </template>
                    </Suspense>
                    <Suspense>
                        <Accordion title="Gallerys" :sub-title="'Modify and Create galleries'" :active="activeAccordion === 'photo-set-creations'"
                            :set-active="(isOpen) => setAccordionOpen('photo-set-creations', isOpen)"
                            :loading="isAccordionLoading"
                            loading-label="Loading galleries...">
                            <Gallerys :error-message="photoGalleryErrorMessage.message" :gallerys="gallerys"
                                @edit-gallery-name="openGalleryEditModal" @delete-gallery="openGalleryDeleteModal"
                                @create-gallery="openGalleryCreateModal" />
                        </Accordion>
                        <template #fallback>
                            <div class="accordion-loading-state">
                                <div class="accordion-spinner" aria-hidden="true"></div>
                                <span>Loading galleries...</span>
                            </div>
                        </template>
                    </Suspense>
                    <Suspense>
                        <Accordion title="Photo Gallery" :sub-title="'Add and Delete photos from galleries'" :active="activeAccordion === 'photo-gallery'"
                            :set-active="(isOpen) => setAccordionOpen('photo-gallery', isOpen)"
                            :loading="isAccordionLoading"
                            loading-label="Loading photo gallery...">
                            <PhotoGallery :error-message="photosErrorMessage.message" :galleries="gallerys"
                                :photos="photos" @create-photo="openPhotoCreateModal" />
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
        <div v-if="isGalleryCreateModalOpen" class="modal-backdrop" @click.self="closeGalleryCreateModal">
            <div class="modal-shell" role="dialog" aria-modal="true" aria-label="Create gallery">
                <h3 class="modal-title">Create Gallery</h3>
                <p class="modal-error-message">{{ photoGalleryErrorMessage.message }}</p>
                <div class="modal-form">
                    <div class="modal-field">
                        <label class="modal-label" for="gallery-name-input">Gallery name</label>
                        <input id="gallery-name-input" v-model="editingGalleryName" class="modal-input" type="text"
                            autocomplete="off" @keyup.enter="createGallerySubmit" />
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-button secondary"
                        @click="closeGalleryCreateModal">Cancel</button>
                    <button type="button" class="modal-button primary"
                        @click="createGallerySubmit">Create</button>
                </div>
            </div>
        </div>
        <div v-if="isGalleryEditModalOpen" class="modal-backdrop" @click.self="closeGalleryEditModal">
            <div class="modal-shell" role="dialog" aria-modal="true" aria-label="Edit gallery name">
                <h3 class="modal-title">Edit Gallery Name</h3>
                <div class="modal-form">
                    <div class="modal-field">
                        <label class="modal-label" for="gallery-name-edit-input">Gallery name</label>
                        <input id="gallery-name-edit-input" v-model="editingGalleryName" class="modal-input" type="text"
                            autocomplete="off" @keyup.enter="saveGalleryName" />
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-button secondary"
                        @click="closeGalleryEditModal">Cancel</button>
                    <button type="button" class="modal-button primary" @click="saveGalleryName">Save</button>
                </div>
            </div>
        </div>

        <div v-if="isDeleteModalOpen" class="modal-backdrop" @click.self="closeDeleteModal">
            <div class="modal-shell" role="dialog" aria-modal="true" aria-label="Delete confirmation">
                <h3 class="modal-title">Delete {{ deleteModalTargetType }}</h3>
                <p class="modal-delete-message">
                    Are you sure you want to delete "{{ deleteModalTargetName }}"?
                    This action cannot be undone.
                </p>
                <div class="modal-actions">
                    <button type="button" class="modal-button secondary" @click="closeDeleteModal">Cancel</button>
                    <button type="button" class="modal-button primary" @click="confirmDelete">Delete</button>
                </div>
            </div>
        </div>

        <div v-if="isTagCreateModalOpen || isTagEditModalOpen" class="modal-backdrop" @click.self="closeTagModal">
            <div class="modal-shell" role="dialog" aria-modal="true" aria-label="Create tag">
                <h3 class="modal-title">{{ editingGalleryId ? 'Edit Tag' : 'Create Tag' }}</h3>
                <div class="modal-form">
                    <div class="modal-field">
                        <label class="modal-label" for="tag-name-input">Tag name</label>
                        <input id="tag-name-input" v-model="editingGalleryName" class="modal-input" type="text"
                            autocomplete="off" @keyup.enter="saveTagName" />
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-button secondary"
                        @click="closeTagModal">Cancel</button>
                    <button type="button" class="modal-button primary" @click="saveTagName">{{ editingGalleryId ? 'Save' : 'Create' }}</button>
                </div>
            </div>
        </div>

        <div v-if="isPhotoCreateModalOpen || isPhotoEditModalOpen" class="modal-backdrop" @click.self="closePhotoModal">
            <div class="modal-shell" role="dialog" aria-modal="true" aria-label="Create photo">
                <h3 class="modal-title">Create Photo</h3>
                <form class="modal-form" @submit.prevent="createImageModalSubmit">
                    <div class="photo-upload-card" @click="openPhotoPicker">
                        <input ref="photoUploadInput" class="photo-upload-input" type="file" accept="image/*" @change="handlePhotoFileSelection" />
                        <div v-if="photoPreviewUrl" class="photo-upload-preview">
                            <img :src="photoPreviewUrl" alt="Selected photo preview" />
                        </div>
                        <div v-else class="photo-upload-placeholder">
                            <span class="photo-upload-plus">+</span>
                            <span>Add photo</span>
                        </div>
                    </div>
                    <div class="modal-field">
                        <label class="modal-label" for="photo-title-input">Photo title</label>
                        <input id="photo-title-input" v-model="imageFormData.photoTitle" class="modal-input" type="text" autocomplete="off" />
                    </div>
                    <div class="modal-field">
                        <label class="modal-label" for="photo-description-input">Description</label>
                        <textarea id="photo-description-input" v-model="imageFormData.photoDescription" class="modal-textarea" autocomplete="off"></textarea>
                    </div>
                    <div class="modal-field">
                        <label class="modal-label" for="photo-location-input">Location</label>
                        <input id="photo-location-input" v-model="imageFormData.photoLocation" class="modal-input" type="text" autocomplete="off" />
                    </div>
                    <div class="modal-field">
                        <label class="modal-label" for="photo-tags-input">Tags</label>
                        <select id="photo-tags-input" v-model="imageFormData.photoTags" class="modal-select">
                            <option value="">Select a tag</option>
                            <option v-for="tag in tags" :key="tag.tagId" :value="tag.tagId">
                                {{ tag.tagName }}
                            </option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label class="modal-label" for="photo-gallery-select">Gallery</label>
                        <select id="photo-gallery-select" v-model="imageFormData.photoSetId" class="modal-select">
                            <option value="">Select a gallery</option>
                            <option v-for="gallery in gallerys" :key="gallery.photoSetId" :value="gallery.photoSetId">
                                {{ gallery.photoSetTitle }}
                            </option>
                        </select>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="modal-button secondary" @click="closePhotoModal">Cancel</button>
                        <button type="submit" class="modal-button primary">Create</button>
                    </div>
                </form>
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

.modal-delete-message {
    margin: 0 0 1rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.5;
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

.modal-shell {
    width: min(100%, 32rem);
    border: 1px solid rgba(232, 217, 181, 0.35);
    border-radius: 0.95rem;
    background: #141414;
    color: #ffffff;
    padding: 1rem;
    box-shadow: 0 22px 45px rgba(0, 0, 0, 0.45);
}

.modal-title {
    margin: 0 0 0.75rem;
    font-size: 1.15rem;
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.modal-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.modal-label {
    display: block;
    font-size: 0.84rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(232, 217, 181, 0.9);
}

.photo-upload-card {
    width: min(100%, 10rem);
    aspect-ratio: 1;
    border: 1px dashed rgba(232, 217, 181, 0.45);
    border-radius: 0.9rem;
    background: rgba(255, 255, 255, 0.05);
    display: grid;
    place-items: center;
    cursor: pointer;
    overflow: hidden;
    margin-bottom: 0.25rem;
}

.photo-upload-input {
    display: none;
}

.photo-upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    color: rgba(232, 217, 181, 0.9);
    font-size: 0.9rem;
}

.photo-upload-plus {
    font-size: 2rem;
    line-height: 1;
}

.photo-upload-preview {
    width: 100%;
    height: 100%;
}

.photo-upload-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.modal-input,
.modal-textarea,
.modal-select {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(232, 217, 181, 0.28);
    border-radius: 0.6rem;
    padding: 0.7rem 0.8rem;
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
}

.modal-textarea {
    min-height: 6rem;
    resize: vertical;
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