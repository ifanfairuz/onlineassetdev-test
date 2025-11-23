import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createProduct, getProducts } from '@/api/product'
import type { CreateProductPayload, ProductListPaginated } from '../../shared/model/product'

export const useProductStore = defineStore('products', () => {
  const loading = ref(false)
  const per_page = ref(10)
  const state = ref<ProductListPaginated>({
    data: [],
    meta: {
      current_page: 1,
      total_pages: 1,
      per_page: per_page.value,
      total: 0,
    },
  })

  async function prev() {
    if (loading.value) return
    if (state.value.meta.current_page === 1) return

    try {
      loading.value = true
      state.value = await getProducts(state.value.meta.current_page - 1, state.value.meta.per_page)
    } finally {
      loading.value = false
    }
  }

  async function next() {
    if (loading.value) return
    if (state.value.meta.current_page === state.value.meta.total_pages) return

    try {
      loading.value = true
      state.value = await getProducts(state.value.meta.current_page + 1, state.value.meta.per_page)
    } finally {
      loading.value = false
    }
  }

  async function add(payload: CreateProductPayload) {
    if (loading.value) return

    try {
      loading.value = true
      await createProduct(payload)
      state.value = await getProducts(state.value.meta.current_page, state.value.meta.per_page)
    } finally {
      loading.value = false
    }
  }

  async function setPerPage(perPage: number) {
    if (loading.value) return

    try {
      state.value = {
        ...state.value,
        meta: {
          ...state.value.meta,
          per_page: perPage,
        },
      }
      loading.value = true
      state.value = await getProducts(1, perPage)
    } finally {
      loading.value = false
    }
  }

  async function refresh() {
    if (loading.value) return

    try {
      loading.value = true
      state.value = await getProducts(1, state.value.meta.per_page)
    } finally {
      loading.value = false
    }
  }

  return { state, loading, next, prev, add, setPerPage, refresh }
})
