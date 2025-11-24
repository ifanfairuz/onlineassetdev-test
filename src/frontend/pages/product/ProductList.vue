<script setup lang="ts">
import { createProduct, getProducts } from '@/api/product'
import { Management } from '@/components/management'
import { TableCell, TableHeadCell, TableHeadRow, TableRow } from '@/components/table'
import { formatCurrency, formatDate } from '@/lib/utils'
</script>

<template>
  <Management
    :fetch-datas="getProducts"
    :create-data="createProduct"
    :get-id="({ id }) => id.toString()"
  >
    <template #table-head>
      <TableHeadRow>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell class="w-[200px]">Price</TableHeadCell>
        <TableHeadCell>Category</TableHeadCell>
        <TableHeadCell class="w-[250px]">Created At</TableHeadCell>
        <TableHeadCell class="w-[250px]">Updated At</TableHeadCell>
      </TableHeadRow>
    </template>
    <template #render-row="{ data }">
      <TableRow>
        <TableCell>{{ data.name }}</TableCell>
        <TableCell>{{ formatCurrency(data.price) }}</TableCell>
        <TableCell>{{ data.category }}</TableCell>
        <TableCell>{{ formatDate(data.created_at) }}</TableCell>
        <TableCell>{{ formatDate(data.updated_at) }}</TableCell>
      </TableRow>
    </template>
  </Management>
</template>
