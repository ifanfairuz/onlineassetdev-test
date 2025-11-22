import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

const router = () => {
  const router = createRouter({
    history: createHistory(),
    routes: [
      {
        path: '/',
        component: () => import('@/pages/Home.vue'),
      },

      // 500
      {
        path: '/error/500',
        component: () => import('@/pages/Error.vue'),
      },

      // 404
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/404.vue'),
      },
    ],
  })

  return router
}

function createHistory() {
  if (typeof window === 'undefined') {
    return createMemoryHistory()
  }

  return createWebHistory(import.meta.env.BASE_URL)
}

export default router
