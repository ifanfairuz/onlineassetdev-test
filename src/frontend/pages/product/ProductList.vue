<script setup lang="ts">
import { useApiClient } from '@/api'
import { Datatable } from '@/components/datatable'
import { TableCell, TableHeadCell, TableHeadRow, TableRow } from '@/components/table'
import { formatCurrency } from '@/lib/utils'

const { product } = useApiClient()
const fetchDatas = product.getProducts.bind(product)
</script>

<template>
  <Datatable
    :fetch-datas="fetchDatas"
    :get-id="({ id }) => id.toString()"
    create-url="/products/create"
  >
    <template #table-head>
      <TableHeadRow>
        <TableHeadCell class="w-20">ID</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell class="w-[200px]">Price</TableHeadCell>
        <TableHeadCell>Category</TableHeadCell>
      </TableHeadRow>
    </template>
    <template #render-row="{ data }">
      <TableRow>
        <TableCell>{{ data.id }}</TableCell>
        <TableCell>{{ data.name }}</TableCell>
        <TableCell>{{ formatCurrency(data.price) }}</TableCell>
        <TableCell>{{ data.category }}</TableCell>
      </TableRow>
    </template>
  </Datatable>
</template>
