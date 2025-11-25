<script setup lang="ts" generic="Model">
import Button from '../Button.vue'
import IconLoading from '../icons/IconLoading.vue'
import { useDatatableContext } from './datatable-context'
import { Input } from '../form'

defineProps<{
  createUrl?: string
}>()
const { loading, search } = useDatatableContext<Model>()
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
      <div
        v-if="loading"
        class="text-sm text-muted-foreground flex items-center gap-2 [&>svg]:size-4"
      >
        <IconLoading />
        <span> Loading... </span>
      </div>
    </div>
    <div>
      <Input v-model="search" type="search" placeholder="Search" class="w-full" />
    </div>
  </div>
</template>
