<script lang="ts" setup>
import type { TagInterface } from '../../lib/types/PhotographyPhotoInterface';


const props = defineProps<{
    tags: Array<TagInterface>
    errorMessage?: string
}>()
console.log(props.tags)
const emit = defineEmits<{
    (event: 'edit-tag-name', tag: TagInterface): void
    (event: 'delete-tag', tag: TagInterface): void
    (event: 'create-tag'): void
}>()

const onEditTagName = (tag: TagInterface | null) => {
    if (tag) {
        emit('edit-tag-name', tag)
    }
}

const onDeleteTag = (tag: TagInterface | null) => {
    if (tag) {
        emit('delete-tag', tag)
    }
}

const onCreateTag = () => {
    emit('create-tag')
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
                <button class="gallery-item-button add" type="button" @click="onCreateTag">New Tag</button>
            </div>
            <template v-if="!props.tags || props.tags.length === 0">
                <p>No tags available.</p>
            </template>
            <template v-else>
                <div v-for="tag in props.tags" :key="tag.tagId" class="gallery-item">
                    <h4 class="galleryPhotoSetTitle">{{ tag.tagName }}</h4>
                    <div class="gallery-item-button-container"> 
                        <button class="gallery-item-button" type="button" @click="onEditTagName(tag)" aria-label="Edit tag">
                            <span class="action-icon" aria-hidden="true">✎</span>
                        </button>
                        <button class="gallery-item-button delete" type="button" @click="onDeleteTag(tag)" aria-label="Delete tag">
                            <span class="action-icon" aria-hidden="true">🗑</span>
                            
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