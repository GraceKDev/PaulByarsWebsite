
<script lang="ts">
import { defineBasicLoader } from 'vue-router/experimental'
import { getUserById } from '../api'

export const useUserData = defineBasicLoader('/users/[id]', async to => {
  return getUserById(to.params.id)
})
</script>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';

import Dropdown from '../components/Globals/Dropdown.vue';
import PhotoGalleryGrid from '../components/AdminDashboard/PhotoGalleryGrid.vue';
import type { PhotographyPhotoInterface, PhotoSetInterface, TagInterface } from '../lib/types/PhotographyPhotoInterface.ts';
import { getAllTags } from '../lib/api/tag.ts';
import { getAllPhotos } from '../lib/api/photo.ts';
import { getAllGallery } from '../lib/api/photoset.ts';

onMounted(async () => {
  await loadItems();
});

const errorMessage = reactive({
  message: ""
});

const gallerys = ref<PhotoSetInterface[]>([]);
const tags = ref<TagInterface[]>([]);
const photos = ref<PhotographyPhotoInterface[]>([]);
const isLoading = ref(true);
const selectedGallery = ref('');
const selectedTags = ref<string[]>([]);

const galleryOptions = computed(() =>
  gallerys.value.map((g) => ({
    label: g.photoSetTitle,
    value: g.photoSetId,
  }))
);

const tagOptions = computed(() =>
  tags.value.map((t) => ({
    label: t.tagName,
    value: t.tagId,
  }))
);

const filteredPhotos = computed(() => {
  let result = photos.value;

  if (selectedGallery.value) {
    result = result.filter((p) => p.photoSetId === selectedGallery.value);
  }

  if (selectedTags.value.length > 0) {
    result = result.filter((p) =>
      p.photoTags && selectedTags.value.some((tagId) => p.photoTags.includes(tagId))
    );
  }

  return result;
});

const loadItems = async () => {
  isLoading.value = true;
  try {
    tags.value = await getAllTags(errorMessage);
    photos.value = await getAllPhotos(errorMessage);
    gallerys.value = await getAllGallery(errorMessage);
  }
  catch (error) {
    errorMessage.message = "Unable to load endpoint.";
    console.error(error);
  }
  finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="gallery" aria-label="Gallery">
    <div class="gallery-inner">
      <header class="section-header">
        <p class="section-eyebrow">Portfolio</p>
        <h2 class="section-heading">Gallery</h2>
        <div class="section-divider"></div>
      </header>
      <div class="gallery-filters">
        <Dropdown
          id="gallery-filter"
          label="Gallery"
          :options="galleryOptions"
          v-model="selectedGallery"
        />
        <Dropdown
          id="tag-filter"
          label="Tags"
          :options="tagOptions"
          v-model="selectedTags"
          :multiple="true"
          placeholder="All Tags"
        />
      </div>
      <div class="gallery-items">
        <PhotoGalleryGrid :photos="filteredPhotos" :editing-enabled="false" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  width: 100%;
  min-height: 100vh;
  padding: 7rem 8vw;
  background:
    radial-gradient(circle, transparent 40%, rgba(0, 0, 0, .45) 100%),
    #090909;
  box-sizing: border-box;
}

.gallery-inner {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 1.0rem;
}

.section-eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.48em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
  margin: 0 0 0.85rem;
}

.section-heading {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #ffffff;
}

.section-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 2.5rem 0 0;
}

.gallery-filters {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  margin-bottom: 4.5rem;
}

.gallery-items {
  margin-top: 2rem;
}
</style>
