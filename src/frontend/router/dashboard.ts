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
    component: () => import('@/pages/user/UserList.vue'),
    meta: {
      breadcrumbs: [{ label: 'Management' }, { label: 'User' }],
    },
  },
  {
    path: '/users/create',
    name: 'dashboard.user.create',
    component: () => import('@/pages/user/UserCreate.vue'),
    meta: {
      breadcrumbs: [{ label: 'Management' }, { label: 'User', url: '/users' }, { label: 'Create' }],
    },
  },
  {
    path: '/products',
    name: 'dashboard.product.list',
    component: () => import('@/pages/product/ProductList.vue'),
    meta: {
      breadcrumbs: [{ label: 'Management' }, { label: 'Product' }],
    },
  },
  {
    path: '/products/create',
    name: 'dashboard.product.create',
    component: () => import('@/pages/product/ProductCreate.vue'),
    meta: {
      breadcrumbs: [
        { label: 'Management' },
        { label: 'Product', url: '/products' },
        { label: 'Create' },
      ],
    },
  },
]

export default routes
