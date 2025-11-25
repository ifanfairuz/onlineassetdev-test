<script setup lang="ts" generic="Model">
import Button from '../Button.vue'
import { formatDate } from '@/lib/utils'
import IconLoading from '../icons/IconLoading.vue'
import { useDatatableContext } from './datatable-context'

defineProps<{
  createUrl?: string
}>()
const { loading, meta } = useDatatableContext<Model>()
</script>

<template>
  <div class="flex flex-row items-end justify-between gap-2">
    <div class="flex items-center gap-2">
      <Button v-if="createUrl" aria-label="Create" :to="createUrl">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
            d="M6 12h12m-6 6V6"
          />
        </svg>
        <span>Create</span>
      </Button>
    </div>
    <div class="text-sm text-muted-foreground flex items-center gap-2 [&>svg]:size-4">
      <template v-if="loading && !!meta.fetched_at">
        <IconLoading />
        <span> Loading... </span>
      </template>
      <span v-else-if="meta.fetched_at"> Loaded at: {{ formatDate(meta.fetched_at) }} </span>
    </div>
  </div>
</template>
