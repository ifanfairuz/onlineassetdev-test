<script setup lang="ts">
defineProps<{
  title: string
  url?: string
  external?: boolean
}>()
</script>

<template>
  <component
    :is="!!external ? 'a' : 'router-link'"
    :to="url"
    class="hover:bg-muted-foreground/20 focus-visible:ring-2 ring-ring/50 outline-0 first:rounded-t-md last:rounded-b-md [&.router-link-active]:shadow-xs"
  >
    <div class="flex items-center gap-2 p-2">
      <span class="[&>svg]:size-5">
        <slot name="icon" />
      </span>
      <span>{{ title }}</span>
    </div>
  </component>
</template>
