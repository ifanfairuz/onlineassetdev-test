<script setup lang="ts" generic="T">
import { Table, TableBody, TableHead } from '@/components/table'
import { Select } from './select'
import Button from './Button.vue'
import { useVModel } from '@vueuse/core'
import { formatTimestamp } from '@/lib/utils'
import IconLoading from './icons/IconLoading.vue'
import TableRow from './table/TableRow.vue'
import TableCell from './table/TableCell.vue'
import { computed } from 'vue'

const props = defineProps<{
  datas: T[]
  getId: (data: T) => string
  perPage: number
  rowsCount: number
  pagesCount: number
  currentPage: number
  loading?: boolean
  lastFetchedAt?: Date | null
}>()

const emits = defineEmits<{
  (e: 'update:perPage', perPage: number): void
  (e: 'next'): void
  (e: 'prev'): void
  (e: 'refresh'): void
}>()

const perPage = useVModel(props, 'perPage', emits)
const startRow = computed(() => (props.currentPage - 1) * props.perPage + 1)
const endRow = computed(() => startRow.value + props.datas.length - 1)
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- toolbar -->
    <div class="flex items-center justify-between gap-2">
      <div class="text-sm text-muted-foreground flex items-center gap-2 [&>svg]:size-4">
        <template v-if="loading && !!lastFetchedAt">
          <IconLoading />
          <span> Loading... </span>
        </template>
        <span v-else-if="lastFetchedAt">
          Last Fetched at {{ formatTimestamp(lastFetchedAt) }}
        </span>
      </div>

      <Button variant="outline" aria-label="Refresh" :disabled="loading" @click="emits('refresh')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="size-4"
        >
          <path
            fill="currentColor"
            d="M12.079 2.25c-4.794 0-8.734 3.663-9.118 8.333H2a.75.75 0 0 0-.528 1.283l1.68 1.666a.75.75 0 0 0 1.056 0l1.68-1.666a.75.75 0 0 0-.528-1.283h-.893c.38-3.831 3.638-6.833 7.612-6.833a7.66 7.66 0 0 1 6.537 3.643a.75.75 0 1 0 1.277-.786A9.16 9.16 0 0 0 12.08 2.25m8.761 8.217a.75.75 0 0 0-1.054 0L18.1 12.133a.75.75 0 0 0 .527 1.284h.899c-.382 3.83-3.651 6.833-7.644 6.833a7.7 7.7 0 0 1-6.565-3.644a.75.75 0 1 0-1.277.788a9.2 9.2 0 0 0 7.842 4.356c4.808 0 8.765-3.66 9.15-8.333H22a.75.75 0 0 0 .527-1.284z"
          />
        </svg>
        <span>Refresh</span>
      </Button>
    </div>

    <!-- table -->
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

    <!-- pagination -->
    <div class="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
      <div class="text-muted-foreground text-sm">
        {{ startRow }}-{{ endRow }} of {{ rowsCount }} row(s) shown.
      </div>
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-2">
          <p class="text-sm text-muted-foreground">Show</p>
          <Select
            class="w-20"
            :model-value="perPage.toString()"
            @update:model-value="emits('update:perPage', parseInt($event))"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </Select>
        </div>
        <ul class="flex justify-center gap-3 text-foreground">
          <li>
            <Button variant="outline" aria-label="Previous page" @click="emits('prev')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="size-6"
              >
                <path
                  fill="currentColor"
                  d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"
                />
              </svg>
            </Button>
          </li>

          <li class="text-sm/8 font-medium tracking-widest">{{ currentPage }}/{{ pagesCount }}</li>

          <li>
            <Button variant="outline" aria-label="Next page" @click="emits('next')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="size-6"
              >
                <path
                  fill="currentColor"
                  d="m13.292 12l-4.6-4.6l.708-.708L14.708 12L9.4 17.308l-.708-.708z"
                />
              </svg>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
