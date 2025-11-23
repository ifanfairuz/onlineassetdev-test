<script setup lang="ts">
import { computed } from 'vue'
import BreadcrumbDivider from './BreadcrumbDivider.vue'
import type { BreadcrumbData } from './BreadcrumbItem.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

const { items } = defineProps<{ items: BreadcrumbData[] }>()
const datas = computed(() => {
  const result: (BreadcrumbData & { divider?: boolean })[] = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]!

    if (items.length == i + 1) {
      // remove url if it's the last item
      result.push({ label: item.label })
    } else if (items.length > i + 1) {
      // add divider if there is a next item
      result.push({ divider: true, label: i.toString() })
    } else {
      // add item
      result.push(item)
    }
  }

  return result
})
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol
      class="flex items-center gap-1 text-sm text-neutral-500 [&_li:last-child]:text-foreground [&_li:last-child]:font-bold"
    >
      <li v-for="item in datas" :key="item.label">
        <component
          :is="'divider' in item ? BreadcrumbDivider : BreadcrumbItem"
          :url="item.url"
          :label="item.label"
        />
      </li>
    </ol>
  </nav>
</template>
