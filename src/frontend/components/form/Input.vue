<script setup lang="ts">
defineProps<{
  modelValue?: string
  name?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emits('update:modelValue', target.value)
}
</script>

<template>
  <input
    type="text"
    class="w-full rounded-md border border-border px-2 py-1 bg-input/60 outline-0 focus-visible:ring-2 ring-ring/50 disabled:opacity-50 disabled:pointer-events-none"
    v-bind="$props"
    :value="modelValue"
    @change="onChange"
  />
</template>
