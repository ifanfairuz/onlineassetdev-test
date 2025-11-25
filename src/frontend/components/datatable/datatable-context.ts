import { inject, onBeforeUnmount, onMounted, provide, ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

const KEY = Symbol('datatable-context')

interface Meta {
  current_page: number
  total_pages: number
  per_page: number
  total: number
  fetched_at?: Date | null
}

interface FetchResult<Model> {
  data: Model[]
  meta: Meta
}

export interface DatatableContextOptions<Model> {
  fetchDatas: (page: number, perPage: number, search?: string) => Promise<FetchResult<Model>>
}

export function provideDatatableContext<Model>(options: DatatableContextOptions<Model>) {
  const route = useRoute()

  const loading = ref(true)
  const search = ref(route.query.search ? String(route.query.search) : '')
  const datas = ref<Model[]>([]) as Ref<Model[]>
  const meta = ref<Meta>({
    current_page: parseInteger(route.query.page, 1),
    total_pages: 1,
    per_page: parseInteger(route.query.per_page, 10, [10, 20, 30, 40, 50]),
    total: 0,
    fetched_at: null,
  })

  async function getDatas(page?: number, perPage?: number, keyword?: string) {
    try {
      loading.value = true
      const { current_page, per_page } = meta.value
      const res = await options.fetchDatas(
        page ?? current_page,
        perPage ?? per_page,
        keyword ?? search.value,
      )
      datas.value = res.data
      meta.value = res.meta
    } catch {
      toast.error('Error loading data')
    } finally {
      loading.value = false
    }
  }

  function replaceHistory(page?: number, perPage?: number, search?: string) {
    const { current_page, per_page } = meta.value
    const url = new URL(route.path, window.location.href)
    url.searchParams.set('page', String(page ?? current_page))
    url.searchParams.set('per_page', String(perPage ?? per_page))
    if (search?.length) {
      url.searchParams.set('search', search)
    }

    history.replaceState(history.state, '', url.href)
  }

  function searching(keyword?: string) {
    const { per_page } = meta.value
    getDatas(1, per_page, keyword ?? search.value)
    replaceHistory(1, per_page, keyword ?? search.value)
  }

  async function next() {
    if (loading.value) return
    if (meta.value.current_page === meta.value.total_pages) return
    getDatas(meta.value.current_page + 1)
    replaceHistory(meta.value.current_page + 1)
  }

  async function prev() {
    if (loading.value) return
    if (meta.value.current_page === 1) return
    getDatas(meta.value.current_page - 1)
    replaceHistory(meta.value.current_page - 1)
  }

  async function setPerPage(perPage: number) {
    if (loading.value) return
    meta.value = {
      ...meta.value,
      per_page: perPage,
    }
    getDatas(1, perPage)
    replaceHistory(1, perPage)
  }

  const context = {
    loading,
    search,
    datas,
    meta,
    next,
    prev,
    setPerPage,
  }
  onMounted(() => {
    getDatas()
  })

  let timer: NodeJS.Timeout | null = null
  watch(search, () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      searching()
    }, 300)
  })

  onBeforeUnmount(() => {
    if (timer) {
      clearTimeout(timer)
    }
  })

  provide(KEY, context)
  return context
}

export function useDatatableContext<M>() {
  const data = inject<ReturnType<typeof provideDatatableContext<M>>>(KEY)
  if (!data) {
    throw new Error(
      'useDatatableContext must be called within a setupDatatableContext on parent component',
    )
  }

  return data
}

/**
 * Parse to integer
 *
 * @param value
 * @param default_value
 * @param allows
 * @returns
 */
function parseInteger(value: unknown, default_value: number, allows?: number[]) {
  if (typeof value !== 'number' && typeof value !== 'string') return default_value

  let result: number
  if (typeof value === 'string') {
    result = parseInt(value)
  } else if (!Number.isInteger(value)) {
    return default_value
  } else {
    result = value as number
  }

  if (isNaN(result)) {
    return default_value
  }

  if (!!allows && !allows.includes(result)) {
    return default_value
  }

  return result
}
