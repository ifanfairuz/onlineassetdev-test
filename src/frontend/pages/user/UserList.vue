<script setup lang="ts">
import { useApiClient } from '@/api'
import { Datatable } from '@/components/datatable'
import { TableCell, TableHeadCell, TableHeadRow, TableRow } from '@/components/table'

const { user } = useApiClient()
const fetchDatas = user.getUsers.bind(user)
</script>

<template>
  <Datatable
    :fetch-datas="fetchDatas"
    :get-id="({ id }) => id.toString()"
    create-url="/users/create"
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
  </Datatable>
</template>
