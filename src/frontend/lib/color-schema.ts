import { useColorMode, type BasicColorMode } from '@vueuse/core'
import { computed, inject, onBeforeMount, provide, watch, type ComputedRef } from 'vue'

const KEY = Symbol('color-schema')

interface ColorSchema {
  schema: ComputedRef<BasicColorMode>
  toggle: (set?: BasicColorMode) => void
}

export function setupColorSchema() {
  const set = (mode: BasicColorMode) => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const mode = useColorMode()
  const schema = computed(() => mode.state.value)
  watch(mode.state, () => set(mode.state.value))
  onBeforeMount(() => {
    if (mode.system.value === 'dark' && mode.store.value === 'auto') {
      mode.value = 'dark'
    }
  })

  const data: ColorSchema = {
    schema: schema,
    toggle: (set) => {
      if (set) {
        mode.value = set
        return
      }

      if (mode.value === 'dark') {
        mode.value = 'light'
      } else {
        mode.value = 'dark'
      }
    },
  }

  provide(KEY, data)

  return data
}

export function useColorSchema(): ColorSchema {
  const data = inject<ColorSchema>(KEY)
  if (!data) {
    throw new Error('useColorSchema must be called within a setupColorSchema on parent component')
  }

  return data
}
