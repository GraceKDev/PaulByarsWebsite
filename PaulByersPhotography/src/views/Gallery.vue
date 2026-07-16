<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {tempPhotos} from '../lib/temp/TemPhotos';
import {tempGallerys} from '../lib/temp/TemGallery';
import PhotoGalleryGrid from '../components/AdminDashboard/PhotoGalleryGrid.vue';


const selectedFilter = ref('all');
const isFilterOpen = ref(false);
const filterRoot = ref<HTMLElement | null>(null);

const selectedFilterLabel = computed(
  () => tempGallerys.find((option) => option.PhotoSetTitle === selectedFilter.value)?.PhotoSetTitle ?? 'All',
);

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value;
};

const setFilter = (value: string) => {
  selectedFilter.value = value;
  isFilterOpen.value = false;
};

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node | null;
  if (filterRoot.value && target && !filterRoot.value.contains(target)) {
    isFilterOpen.value = false;
  }
};

const handleFilterKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isFilterOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
});

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
        <form @submit.prevent>
          <label class="gallery-filter-label" for="filter">Gallerys</label>
          <div ref="filterRoot" class="gallery-filter" @keydown="handleFilterKeydown">
            <button class="gallery-filter-trigger" type="button" aria-haspopup="listbox" :aria-expanded="isFilterOpen"
              @click="toggleFilter">
              <span>{{ selectedFilterLabel }}</span>
              <span class="gallery-filter-chevron" :class="{ 'is-open': isFilterOpen }" aria-hidden="true">▾</span>
            </button>
            <ul v-if="isFilterOpen" class="gallery-filter-options" role="listbox" aria-label="Gallerys">
              <li v-for="option in tempGallerys" :key="option.PhotoSetTitle">
                <button class="gallery-filter-option" :class="{ 'is-selected': selectedFilter === option.PhotoSetTitle }"
                  type="button" role="option" :aria-selected="selectedFilter === option.PhotoSetTitle"
                  @click="setFilter(option.PhotoSetTitle)">
                  {{ option.PhotoSetTitle }}
                </button>
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div class="gallery-items">
        <PhotoGalleryGrid :photos="tempPhotos" />
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
  margin-bottom: 4.5rem;
}

.gallery-filters form {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.gallery-filter-label {
  color: #ffffff;
  font-size: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.gallery-filter {
  position: relative;
  min-width: 18rem;
}

.gallery-filter-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.62rem 1rem;
  font-size: 0.95rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

.gallery-filter-trigger:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(232, 217, 181, 0.9);
  box-shadow: 0 0 0 3px rgba(232, 217, 181, 0.2);
  transform: translateY(-1px);
}

.gallery-filter-trigger:focus-visible {
  border: 1px solid #e8d9b5;
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 0 0 3px rgba(232, 217, 181, 0.25);
  outline: none;
}

.gallery-filter-chevron {
  font-size: 1.3rem;
  transition: transform 0.2s ease;
}

.gallery-filter-chevron.is-open {
  transform: rotate(180deg);
}

.gallery-filter-options {
  position: absolute;
  top: calc(100% + 0.6rem);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  border-radius: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: #131313;
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.45);
  z-index: 20;
}

.gallery-filter-option {
  width: 100%;
  border: 0;
  background: transparent;
  color: #f3f3f3;
  text-align: left;
  border-radius: 0.55rem;
  padding: 0.62rem 0.72rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;
}

.gallery-filter-option:hover:not(.is-selected),
.gallery-filter-option:focus-visible:not(.is-selected) {
  background: #2a2a2a;
  color: #ffffff;
  outline: none;
}

.gallery-filter-option.is-selected {
  background: #e8d9b5;
  color: #0f0f0f;
  font-weight: 600;
}
</style>
