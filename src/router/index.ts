import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import i18n from '@/i18n'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach(to => {
  const { t } = i18n.global
  const titleKey = to.meta?.title
  if (typeof titleKey === 'string') {
    document.title = t(titleKey)
  }
})

export default router
