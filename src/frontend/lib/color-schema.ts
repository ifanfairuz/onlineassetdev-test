import { useColorMode, type BasicColorMode } from '@vueuse/core'
import { inject, provide, type ComputedRef } from 'vue'

const KEY = Symbol('color-schema')

interface ColorSchema {
  schema: ComputedRef<BasicColorMode>
  toggle: (set?: BasicColorMode) => void
}

export function provideColorSchema() {
  const onChanged = (mode: BasicColorMode) => {
    if (typeof window === 'undefined') return

    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const mode = useColorMode({
    onChanged: onChanged,
    disableTransition: false,
    initialValue: 'light',
  })

  const data: ColorSchema = {
    schema: mode.state,
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
    throw new Error('useColorSchema must be called within a provideColorSchema on parent component')
  }

  return data
}
