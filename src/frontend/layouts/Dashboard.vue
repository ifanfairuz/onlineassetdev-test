<script setup lang="ts">
import type { BreadcrumbData } from '@/components/breadcrumb'
import { SidebarProvider, type SidebarRef } from '@/components/sidebar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
  meta?: {
    breadcrumbs?: BreadcrumbData[]
  }
}>()

const sidebar = ref<SidebarRef>()
const router = useRouter()
router.afterEach((to) => {
  if (sidebar.value) {
    if (to.meta?.breadcrumbs) {
      sidebar.value.setBreadcrumbs(to.meta.breadcrumbs as BreadcrumbData[])
    }

    sidebar.value.close()
  }
})
</script>

<template>
  <SidebarProvider ref="sidebar" :breadcrumbs="meta?.breadcrumbs">
    <router-view />
  </SidebarProvider>
</template>
