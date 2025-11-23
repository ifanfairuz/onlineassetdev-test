<script lang="ts">
export interface BreadcrumbData {
  url?: string
  label: string
}
</script>

<script setup lang="ts">
defineProps<BreadcrumbData>()
</script>

<template>
  <component
    :is="!!url ? 'router-link' : 'span'"
    :to="url"
    class="block transition-colors hover:text-foreground"
  >
    {{ label }}
  </component>
</template>
