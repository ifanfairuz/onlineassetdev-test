import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createUser, getUsers } from '@/api/user'
import type { CreateUserPayload, UserList } from '../../shared/model/user'

export const useUserStore = defineStore('users', () => {
  const loading = ref(false)
  const state = ref<UserList>({
    data: [],
    meta: {
      current_page: 1,
      total_pages: 1,
      per_page: 10,
      total: 0,
      fetched_at: null,
    },
  })

  async function next() {
    if (loading.value) return
    if (state.value.meta.current_page === state.value.meta.total_pages) return

    try {
      loading.value = true

      state.value = await getUsers(state.value.meta.current_page + 1, state.value.meta.per_page)
    } finally {
      loading.value = false
    }
  }

  async function prev() {
    if (loading.value) return
    if (state.value.meta.current_page === 1) return

    try {
      loading.value = true

      state.value = await getUsers(state.value.meta.current_page - 1, state.value.meta.per_page)
    } finally {
      loading.value = false
    }
  }

  async function add(payload: CreateUserPayload) {
    if (loading.value) return

    try {
      loading.value = true
      await createUser(payload)
      state.value = await getUsers(state.value.meta.current_page, state.value.meta.per_page)
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
      state.value = await getUsers(1, perPage)
    } finally {
      loading.value = false
    }
  }

  async function refresh() {
    if (loading.value) return

    try {
      loading.value = true
      state.value = await getUsers(1, state.value.meta.per_page)
    } finally {
      loading.value = false
    }
  }

  return { state, loading, next, prev, add, setPerPage, refresh }
})
