<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import { TableCell, TableHeadCell, TableHeadRow, TableRow } from '@/components/table'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useProductStore()
const { state, loading } = storeToRefs(store)

onMounted(() => {
  store.refresh()
})
</script>

<template>
  <DataTable
    :datas="state.data"
    :get-id="({ id }) => id.toString()"
    :current-page="state.meta.current_page"
    :pages-count="state.meta.total_pages"
    :rows-count="state.meta.total"
    :per-page="state.meta.per_page"
    :last-fetched-at="state.meta.fetched_at"
    :loading="loading"
    @update:per-page="store.setPerPage"
    @next="store.next"
    @prev="store.prev"
    @refresh="store.refresh"
  >
    <template #head>
      <TableHeadRow>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell class="w-[200px]">Price</TableHeadCell>
        <TableHeadCell>Category</TableHeadCell>
        <TableHeadCell class="w-[250px]">Created At</TableHeadCell>
        <TableHeadCell class="w-[250px]">Updated At</TableHeadCell>
      </TableHeadRow>
    </template>
    <template #render="{ data }">
      <TableRow>
        <TableCell>{{ data.name }}</TableCell>
        <TableCell>{{ formatCurrency(data.price) }}</TableCell>
        <TableCell>{{ data.category }}</TableCell>
        <TableCell>{{ formatDate(data.created_at) }}</TableCell>
        <TableCell>{{ formatDate(data.updated_at) }}</TableCell>
      </TableRow>
    </template>
  </DataTable>
</template>
