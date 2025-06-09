import { createI18n } from 'vue-i18n'

import en from '@/i18n/en.json'
import zh from '@/i18n/zh.json'

const i18n = createI18n({
  legacy: false, // Composition API 模式
  locale: localStorage.getItem('lang') || 'zh', // 預設語言
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
  },
})

export default i18n
