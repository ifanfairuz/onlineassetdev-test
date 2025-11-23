<script setup lang="ts">
import type { BreadcrumbData } from '@/components/breadcrumb'
import { SidebarProvider } from '@/components/sidebar'

defineProps<{
  meta?: {
    breadcrumbs?: BreadcrumbData[]
  }
}>()
</script>

<template>
  <SidebarProvider :breadcrumbs="meta?.breadcrumbs">
    <router-view />
  </SidebarProvider>
</template>
