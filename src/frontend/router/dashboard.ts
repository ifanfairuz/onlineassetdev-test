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
  {
    path: '/users',
    name: 'dashboard.user.list',
    component: () => import('@/pages/User.vue'),
    meta: {
      breadcrumbs: [{ label: 'Management' }, { label: 'User' }],
    },
  },
  {
    path: '/products',
    name: 'dashboard.product.list',
    component: () => import('@/pages/Product.vue'),
    meta: {
      breadcrumbs: [{ label: 'Management' }, { label: 'Product' }],
    },
  },
]

export default routes
