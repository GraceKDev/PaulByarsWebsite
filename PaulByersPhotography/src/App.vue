<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SiteHeader from './components/Globals/SiteHeader.vue'



</script>

<template>
  <SiteHeader />
  <main>
    <RouterView />
  </main>
</template>
