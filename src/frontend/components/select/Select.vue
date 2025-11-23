<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emits('update:modelValue', target.value)
}
</script>

<template>
  <select
    class="w-full rounded-md border-neutral-300 sm:text-sm outline-0 focus-visible:ring-2 focus-visible:ring-ring/50 ring-offset-2"
    :value="modelValue"
    @change="onChange"
  >
    <slot />
  </select>
</template>
