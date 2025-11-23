import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'

function createHistory() {
  if (typeof window === 'undefined') {
    return createMemoryHistory()
  }

  return createWebHistory(import.meta.env.BASE_URL)
}

export default function () {
  return _createRouter({
    history: createHistory(),
    routes: routes,
  })
}

const routes: RouteRecordRaw[] = [
  // error page
  {
    path: '/error/:code',
    name: 'error',
    component: () => import('@/pages/Error.vue'),
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'error.404',
    component: () => import('@/pages/404.vue'),
  },
]
