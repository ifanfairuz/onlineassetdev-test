<script setup lang="ts">
import { readonly, ref } from 'vue'
import Header from '../Header.vue'
import { provideSidebarContext } from './sidebar-context'
import Sidebar from './Sidebar.vue'
import type { BreadcrumbData } from '../breadcrumb'

const props = defineProps<{
  breadcrumbs?: BreadcrumbData[]
}>()

const opened = ref(false)
const toggle = () => {
  opened.value = !opened.value
}
const open = () => {
  opened.value = true
}
const close = () => {
  opened.value = false
}

const breadcrumbs = ref<BreadcrumbData[]>(props.breadcrumbs ?? [])
const setBreadcrumbs = (items: BreadcrumbData[]) => {
  breadcrumbs.value = items
}

provideSidebarContext({
  opened: readonly(opened),
  toggle,
  open,
  close,
  breadcrumbs: breadcrumbs,
  setBreadcrumbs,
})
</script>

<template>
  <div class="bg-neutral-100 min-h-svh flex w-full" :data-sidebar="opened ? 'show' : 'hidden'">
    <Sidebar />
    <div
      class="fixed h-svh w-svw bg-black/50 hidden in-data-[sidebar=show]:block lg:hidden! transition duration-100 ease-in-out delay-100"
      @click="close"
    />
    <main class="flex-1 flex p-2">
      <div class="flex-1 flex flex-col bg-background rounded-lg">
        <Header />
        <div class="p-4 lg:p-6">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>
