<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed } from 'vue'

const props = defineProps<{
  class?: string
  to?: string
  variant?: 'primary' | 'ghost' | 'outline'
}>()

const variant = computed(() => {
  switch (props.variant) {
    case 'ghost':
      return 'bg-background text-foreground hover:bg-muted disabled:bg-background disabled:text-foreground/50'

    case 'outline':
      return 'bg-transparent text-foreground bg-muted/60 hover:bg-muted border border-border disabled:bg-transparent disabled:text-foreground/50 disabled:border-border/50'

    default:
      return 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary disabled:text-primary-foreground/50'
  }
})
</script>

<template>
  <component
    :is="!!to ? 'router-link' : 'button'"
    v-bind="$props"
    :class="
      cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3',
        'focus-visible:ring-2',
        variant,
        $props.class,
      )
    "
  >
    <slot />
  </component>
</template>
