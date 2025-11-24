import { inject, onMounted, provide, ref, type Ref } from 'vue'

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

export function provideManagementContext<Model, CreatePayload>(
  options: ManagementContextOptions<Model, CreatePayload>,
) {
  const loading = ref(true)
  const datas = ref<Model[]>([]) as Ref<Model[]>
  const meta = ref<Meta>({
    current_page: 1,
    total_pages: 1,
    per_page: 10,
    total: 0,
    fetched_at: null,
  })

  async function getDatas(page?: number, perPage?: number) {
    const { current_page, per_page } = meta.value
    const res = await options.fetchDatas(page ?? current_page, perPage ?? per_page)
    datas.value = res.data
    meta.value = res.meta
  }

  async function next() {
    if (loading.value) return
    if (meta.value.current_page === meta.value.total_pages) return

    try {
      loading.value = true
      await getDatas(meta.value.current_page + 1)
    } finally {
      loading.value = false
    }
  }

  async function prev() {
    if (loading.value) return
    if (meta.value.current_page === 1) return

    try {
      loading.value = true
      await getDatas(meta.value.current_page - 1)
    } finally {
      loading.value = false
    }
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

    try {
      meta.value = {
        ...meta.value,
        per_page: perPage,
      }
      loading.value = true
      await getDatas(1, perPage)
    } finally {
      loading.value = false
    }
  }

  async function refresh() {
    if (loading.value) return

    try {
      loading.value = true
      await getDatas()
    } finally {
      loading.value = false
    }
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

  onMounted(() => {
    getDatas().finally(() => {
      loading.value = false
    })
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
