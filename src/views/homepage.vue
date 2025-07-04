<template>
  <div class="fullscreen">
    <Transition name="fade" mode="out-in">
      <component :is="activeComponent" :key="currentStep" @next-section="handleNextSection" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 匯入三個段落元件
import First from '@/components/homepage/first.vue'
import Second from '@/components/homepage/second.vue'
import Third from '@/components/homepage/third.vue'
import Fourth from '@/components/homepage/fourth.vue'

const currentStep = ref(2)

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
