<template>
  <Transition name="fade" mode="out-in">
    <div class="fullscreen">
      <component :is="activeComponent" :key="currentStep" @next-section="handleNextSection" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 匯入三個段落元件
import First from '@/components/homepage/first.vue'
import Second from '@/components/homepage/second.vue'
import Third from '@/components/homepage/third.vue'
import Fourth from '@/components/homepage/fourth.vue'

const currentStep = ref(1)

const handleNextSection = () => {
  currentStep.value++
}

// 根據目前步驟顯示對應 component
const activeComponent = computed(() => {
  switch (currentStep.value) {
    case 1:
      return First
    case 2:
      return Second
    case 3:
      return Third
    case 4:
      return Fourth
    default:
      return null
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
