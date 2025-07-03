<template>
  <First v-if="currentStep === 1" @next-section="handleNextSection" />
  <Second v-if="currentStep === 2" @next-section="handleNextSection" />
  <Third v-if="currentStep === 3" />
</template>

<script setup lang="ts">
import First from '@/components/homepage/first.vue'
import Second from '@/components/homepage/second.vue'
import Third from '@/components/homepage/third.vue'

import { ref } from 'vue'

const currentStep = ref(1)

const handleNextSection = () => {
  currentStep.value = currentStep.value + 1
}
</script>
