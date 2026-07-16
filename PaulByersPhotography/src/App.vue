<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SiteHeader from './components/Globals/SiteHeader.vue'

const route = useRoute()
const showSiteHeader = computed(() => !route.path.startsWith('/admin'))
</script>

<template>
  <SiteHeader v-if="showSiteHeader" />
  <main>
    <RouterView />
  </main>
</template>
