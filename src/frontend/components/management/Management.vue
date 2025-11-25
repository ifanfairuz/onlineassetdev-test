<script lang="ts">
export interface ManagementProps<M> extends ManagementContextOptions<M> {
  getId: (data: M) => string
  createUrl?: string
}
</script>

<script setup lang="ts" generic="Model">
import ManagementPagination from './ManagementPagination.vue'
import ManagementTable from './ManagementTable.vue'
import ManagementToolbar from './ManagementToolbar.vue'
import { provideManagementContext, type ManagementContextOptions } from './management-context'

const { getId, createUrl, ...props } = defineProps<ManagementProps<Model>>()
const ctx = provideManagementContext(props)
defineExpose(ctx)
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- toolbar -->
    <ManagementToolbar :create-url="createUrl" />

    <!-- table -->
    <ManagementTable :get-id="getId">
      <template #head>
        <slot name="table-head" />
      </template>
      <template #render="attr">
        <slot name="render-row" v-bind="attr" />
      </template>
    </ManagementTable>

    <!-- pagination -->
    <ManagementPagination />
  </div>
</template>
