<script lang="ts">
export interface ManagementProps<M, C> extends ManagementContextOptions<M, C> {
  getId: (data: M) => string
}
</script>

<script setup lang="ts" generic="Model, CreatePayload">
import ManagementPagination from './ManagementPagination.vue'
import ManagementTable from './ManagementTable.vue'
import ManagementToolbar from './ManagementToolbar.vue'
import { provideManagementContext, type ManagementContextOptions } from './management-context'

const { getId, ...props } = defineProps<ManagementProps<Model, CreatePayload>>()
const ctx = provideManagementContext(props)
defineExpose(ctx)
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- toolbar -->
    <ManagementToolbar />

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
