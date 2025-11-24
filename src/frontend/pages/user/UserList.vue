<script setup lang="ts">
import { useApiClient } from '@/api'
import { Management } from '@/components/management'
import { TableCell, TableHeadCell, TableHeadRow, TableRow } from '@/components/table'

const { user } = useApiClient()
</script>

<template>
  <Management
    :fetch-datas="user.getUsers"
    :create-data="user.createUser"
    :get-id="({ id }) => id.toString()"
  >
    <template #table-head>
      <TableHeadRow>
        <TableHeadCell class="w-20">ID</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Email</TableHeadCell>
      </TableHeadRow>
    </template>
    <template #render-row="{ data }">
      <TableRow>
        <TableCell>{{ data.id }}</TableCell>
        <TableCell>{{ data.name }}</TableCell>
        <TableCell>{{ data.email }}</TableCell>
      </TableRow>
    </template>
  </Management>
</template>
