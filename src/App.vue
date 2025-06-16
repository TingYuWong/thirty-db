<script setup lang="ts">
import '@/style.css'
import { GlobeAltIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import router from '@/router'

const { t, locale } = useI18n()

const switchLang = () => {
  const lang = locale.value === 'zh' ? 'en' : 'zh'

  locale.value = lang
  localStorage.setItem('lang', lang)
  document.title = t(router.currentRoute.value.meta.title as string)
}
</script>

<template>
  <div class="app__switch-lang-container" @click="switchLang">
    <GlobeAltIcon class="app__switch-lang-icon" />
    <div>{{ locale }}</div>
  </div>
  <router-view />
</template>

<style scoped>
.app__switch-lang-container {
  position: fixed;
  right: 2rem;
  top: 2rem;
  background-color: #fff;
  padding: 10px;
  width: 100px;
  height: 40px;
  border-radius: 30px;
  color: var(--brand-color);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  z-index: 9999;
}

.app__switch-lang-container:hover {
  box-shadow: 0 12px 30px rgba(255, 0, 43, 0.25);
}

.app__switch-lang-container:hover {
  color: var(--brand-color-hover);
}

.app__switch-lang-icon {
  width: 30px;
  height: 30px;
}
</style>
