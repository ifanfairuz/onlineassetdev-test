<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  to?: string
}>()
</script>

<template>
  <component
    :is="!!to ? 'router-link' : 'button'"
    v-bind="$props"
    :class="
      cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3',
        $props.class,
      )
    "
  >
    <slot />
  </component>
</template>
