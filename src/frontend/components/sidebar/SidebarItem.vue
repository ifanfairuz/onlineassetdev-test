<script setup lang="ts">
defineProps<{
  title: string
  url?: string
  external?: boolean
}>()
</script>

<template>
  <component :is="!!external ? 'a' : 'router-link'" :to="url" class="hover:bg-neutral-200">
    <div class="flex items-center gap-2 p-2">
      <span class="[&>svg]:size-5">
        <slot name="icon" />
      </span>
      <span>{{ title }}</span>
    </div>
  </component>
</template>
