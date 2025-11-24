<script setup lang="ts">
import { createUser, getUsers } from '@/api/user'
import { Management } from '@/components/management'
import { TableCell, TableHeadCell, TableHeadRow, TableRow } from '@/components/table'
import { formatDate } from '@/lib/utils'
</script>

<template>
  <Management :fetch-datas="getUsers" :create-data="createUser" :get-id="({ id }) => id.toString()">
    <template #table-head>
      <TableHeadRow>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Email</TableHeadCell>
        <TableHeadCell class="w-[250px]">Created At</TableHeadCell>
        <TableHeadCell class="w-[250px]">Updated At</TableHeadCell>
      </TableHeadRow>
    </template>
    <template #render-row="{ data }">
      <TableRow>
        <TableCell>{{ data.name }}</TableCell>
        <TableCell>{{ data.email }}</TableCell>
        <TableCell>{{ formatDate(data.created_at) }}</TableCell>
        <TableCell>{{ formatDate(data.updated_at) }}</TableCell>
      </TableRow>
    </template>
  </Management>
</template>
