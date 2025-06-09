<script setup lang="ts">
import '@/style.css'
// import { useI18n } from 'vue-i18n'
// import router from '@/router'

// const { t, locale } = useI18n()

// function switchLang() {
//   const lang = locale.value === 'zh' ? 'en' : 'zh'

//   locale.value = lang
//   localStorage.setItem('lang', lang)
//   document.title = t(router.currentRoute.value.meta.title as string)
// }
</script>

<template>
  <!-- <div>
    <p>{{ `${t('welcome')}, ${t('greeting')}` }}</p>
    <button @click="switchLang">{{ t('switchLang') }}</button>
  </div> -->
  <router-view />
</template>
