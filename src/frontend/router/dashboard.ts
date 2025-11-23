import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard.home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      breadcrumbs: [{ label: 'Dashboard' }],
    },
  },
]

export default routes
