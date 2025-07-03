import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/homepage.vue'), // lazy load
    meta: {
      title: 'home.title',
    },
  },
  // {
  //   path: '/podcast/:id',
  //   name: 'Podcast',
  //   component: () => import('@/views/podcast.vue'),
  //   props: true,
  //   meta: {
  //     title: 'podcast.title',
  //   },
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/not-found.vue'),
  //   meta: {
  //     title: 'notFound.title',
  //   },
  // },
]

export default routes
