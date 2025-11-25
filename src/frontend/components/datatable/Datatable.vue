<script lang="ts">
export interface DatatableProps<M> extends DatatableContextOptions<M> {
  getId: (data: M) => string
  createUrl?: string
}
</script>

<script setup lang="ts" generic="Model">
import DatatablePagination from './DatatablePagination.vue'
import DatatableTable from './DatatableTable.vue'
import DatatableToolbar from './DatatableToolbar.vue'
import { provideDatatableContext, type DatatableContextOptions } from './datatable-context'

const { getId, createUrl, ...props } = defineProps<DatatableProps<Model>>()
const ctx = provideDatatableContext(props)
defineExpose(ctx)
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- toolbar -->
    <DatatableToolbar :create-url="createUrl" />

    <!-- table -->
    <DatatableTable :get-id="getId">
      <template #head>
        <slot name="table-head" />
      </template>
      <template #render="attr">
        <slot name="render-row" v-bind="attr" />
      </template>
    </DatatableTable>

    <!-- pagination -->
    <DatatablePagination />
  </div>
</template>
