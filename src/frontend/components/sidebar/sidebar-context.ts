import { inject, provide, type Ref } from 'vue'
import type { BreadcrumbData } from '../breadcrumb'

const KEY = Symbol('sidebar-context')

export interface SidebarContext {
  opened: Readonly<Ref<boolean>>
  toggle: () => void
  open: () => void
  close: () => void
  breadcrumbs: Readonly<Ref<BreadcrumbData[]>>
  setBreadcrumbs: (items: BreadcrumbData[]) => void
}

export interface SidebarRef {
  setBreadcrumbs: (items: BreadcrumbData[]) => void
  toggle: () => void
  open: () => void
  close: () => void
}

export function provideSidebarContext(data: SidebarContext) {
  provide(KEY, data)
}

export function useSidebar() {
  const data = inject<SidebarContext>(KEY)
  if (!data) {
    throw new Error('useSidebar must use with SidebarProvider')
  }

  return data
}
