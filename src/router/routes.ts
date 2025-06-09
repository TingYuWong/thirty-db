import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('@/views/landing-page.vue'), // lazy load
    meta: {
      title: 'home.title',
    },
  },
  {
    path: '/podcast/:id',
    name: 'Podcast',
    component: () => import('@/views/podcast.vue'),
    props: true,
    meta: {
      title: 'podcast.title',
    },
  },
  {
    path: '/fortune-cookie',
    name: 'FortuneCookie',
    component: () => import('@/views/fortune-cookie.vue'),
    meta: {
      title: 'fortuneCookie.title',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/not-found.vue'),
    meta: {
      title: 'notFound.title',
    },
  },
]

export default routes
