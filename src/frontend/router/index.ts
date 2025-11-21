import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

const router = () => {
  const router = createRouter({
    history: createHistory(),
    routes: [
      {
        path: '/',
        component: () => import('@/pages/HomePage.vue'),
      },

      // NotFound
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/404Page.vue'),
      },

      // Error
      {
        path: '/:pathMatch(.*)*',
        name: 'Error',
        component: () => import('@/pages/ErrorPage.vue'),
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
