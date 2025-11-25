<script setup lang="ts" generic="Model">
import { Table, TableBody, TableHead } from '@/components/table'
import IconLoading from '../icons/IconLoading.vue'
import TableRow from '../table/TableRow.vue'
import TableCell from '../table/TableCell.vue'
import { useManagementContext } from './management-context'

defineProps<{
  getId: (data: Model) => string
}>()

const { datas, loading } = useManagementContext<Model>()
</script>

<template>
  <Table>
    <TableHead>
      <slot name="head" />
    </TableHead>
    <TableBody>
      <template v-if="datas.length">
        <slot name="render" v-for="data in datas" :key="getId(data)" :data="data" />
      </template>
      <TableRow v-else-if="loading">
        <TableCell colspan="100%">
          <div class="flex items-center justify-center gap-2 py-8">
            <IconLoading />
            <span> Loading data... </span>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
