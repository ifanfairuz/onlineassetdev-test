import { inject, onBeforeUnmount, onMounted, provide, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const KEY = Symbol('management-context')

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

export interface ManagementContextOptions<Model, CreatePayload> {
  fetchDatas: (page: number, perPage: number) => Promise<FetchResult<Model>>
  createData: (data: CreatePayload) => Promise<Model>
}

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

export function provideManagementContext<Model, CreatePayload>(
  options: ManagementContextOptions<Model, CreatePayload>,
) {
  const router = useRouter()
  const route = useRoute()
  const route_path = route.path

  const loading = ref(true)
  const datas = ref<Model[]>([]) as Ref<Model[]>
  const meta = ref<Meta>({
    current_page: parseInteger(route.query.page, 1),
    total_pages: 1,
    per_page: parseInteger(route.query.per_page, 10, [10, 20, 30, 40, 50]),
    total: 0,
    fetched_at: null,
  })

  async function getDatas(page?: number, perPage?: number) {
    try {
      loading.value = true
      const { current_page, per_page } = meta.value
      const res = await options.fetchDatas(page ?? current_page, perPage ?? per_page)
      datas.value = res.data
      meta.value = res.meta
    } finally {
      loading.value = false
    }
  }

  function go(page?: number, perPage?: number) {
    const { current_page, per_page } = meta.value
    router.replace({ query: { page: page ?? current_page, per_page: perPage ?? per_page } })
  }

  async function next() {
    if (loading.value) return
    if (meta.value.current_page === meta.value.total_pages) return
    go(meta.value.current_page + 1)
  }

  async function prev() {
    if (loading.value) return
    if (meta.value.current_page === 1) return
    go(meta.value.current_page - 1)
  }

  async function add(payload: CreatePayload) {
    if (loading.value) return

    try {
      loading.value = true
      await options.createData(payload)
      await getDatas()
    } finally {
      loading.value = false
    }
  }

  async function setPerPage(perPage: number) {
    if (loading.value) return
    meta.value = {
      ...meta.value,
      per_page: perPage,
    }
    go(1, perPage)
  }

  async function refresh() {
    if (loading.value) return
    await getDatas()
  }

  const context = {
    loading,
    datas,
    meta,
    next,
    prev,
    add,
    setPerPage,
    refresh,
  }

  const unsubscribe = router.beforeEach((to) => {
    if (to.path !== route_path) return

    getDatas(
      parseInteger(to.query.page, 1),
      parseInteger(to.query.per_page, 10, [10, 20, 30, 40, 50]),
    )
  })
  onMounted(() => {
    getDatas()
  })

  onBeforeUnmount(() => {
    unsubscribe()
  })

  provide(KEY, context)
  return context
}

export function useManagementContext<M, C>() {
  const data = inject<ReturnType<typeof provideManagementContext<M, C>>>(KEY)
  if (!data) {
    throw new Error(
      'useManagementContext must be called within a setupManagementContext on parent component',
    )
  }

  return data
}
