<script setup lang="ts" generic="Model">
import { computed } from 'vue'
import { useManagementContext } from './management-context'
import { Select, SelectItem } from '../select'
import Button from '../Button.vue'

const { loading, meta, datas, setPerPage, next, prev } = useManagementContext<Model, never>()
const shown_label = computed(() => {
  const rows_count = datas.value.length
  if (rows_count === 0) return ''

  const { current_page, per_page, total } = meta.value
  const offset = (current_page - 1) * per_page
  const start_row = offset + 1
  const end_row = offset + rows_count

  return `${start_row}-${end_row} of ${total} row(s) shown.`
})
</script>

<template>
  <div class="flex flex-col gap-x-2 gap-y-4 md:flex-row md:items-center md:justify-between">
    <div class="text-muted-foreground text-sm">
      {{ shown_label }}
    </div>
    <div class="flex items-center gap-4 justify-between">
      <div class="flex items-center gap-2">
        <p class="text-sm text-muted-foreground">Show</p>
        <Select
          class="w-20"
          :disabled="loading"
          :model-value="meta.per_page.toString()"
          @update:model-value="setPerPage(parseInt($event))"
        >
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="40">40</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </Select>
      </div>
      <ul class="flex justify-center gap-3 text-foreground">
        <li>
          <Button variant="outline" aria-label="Previous page" @click="prev" :disabled="loading">
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

        <li class="text-sm/8 font-medium tracking-widest">
          {{ meta.current_page }}/{{ meta.total_pages }}
        </li>

        <li>
          <Button variant="outline" aria-label="Next page" @click="next" :disabled="loading">
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
</template>
