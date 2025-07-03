<script setup lang="ts">
import '@/style.css'
import { useViewportHeight } from '@/composables/useViewportHeight'
useViewportHeight()
</script>

<template>
  <router-view />
</template>
