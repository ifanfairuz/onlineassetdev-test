<script setup lang="ts" generic="Model, CreatePayload">
import Button from '../Button.vue'
import { formatTimestamp } from '@/lib/utils'
import IconLoading from '../icons/IconLoading.vue'
import { useManagementContext } from './management-context'

const { loading, meta, refresh } = useManagementContext<Model, CreatePayload>()
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center gap-2">
    <div class="flex items-center gap-2">
      <Button aria-label="Create">
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
    <div class="hidden items-center gap-2 ml-auto md:flex">
      <div class="text-sm text-muted-foreground flex items-center gap-2 [&>svg]:size-4">
        <template v-if="loading && !!meta.fetched_at">
          <IconLoading />
          <span> Loading... </span>
        </template>
        <span v-else-if="meta.fetched_at"> Loaded at: {{ formatTimestamp(meta.fetched_at) }} </span>
      </div>
      <Button variant="outline" aria-label="Refresh" :disabled="loading" @click="refresh">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.079 2.25c-4.794 0-8.734 3.663-9.118 8.333H2a.75.75 0 0 0-.528 1.283l1.68 1.666a.75.75 0 0 0 1.056 0l1.68-1.666a.75.75 0 0 0-.528-1.283h-.893c.38-3.831 3.638-6.833 7.612-6.833a7.66 7.66 0 0 1 6.537 3.643a.75.75 0 1 0 1.277-.786A9.16 9.16 0 0 0 12.08 2.25m8.761 8.217a.75.75 0 0 0-1.054 0L18.1 12.133a.75.75 0 0 0 .527 1.284h.899c-.382 3.83-3.651 6.833-7.644 6.833a7.7 7.7 0 0 1-6.565-3.644a.75.75 0 1 0-1.277.788a9.2 9.2 0 0 0 7.842 4.356c4.808 0 8.765-3.66 9.15-8.333H22a.75.75 0 0 0 .527-1.284z"
          />
        </svg>
        <span>Refresh</span>
      </Button>
    </div>
  </div>
</template>
