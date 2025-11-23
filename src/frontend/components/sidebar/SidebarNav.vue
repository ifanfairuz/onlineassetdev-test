<script setup lang="ts">
import SidebarNavHeading from './SidebarNavHeading.vue'

defineProps<{ heading?: string }>()
</script>

<template>
  <div class="flex flex-col text-sm">
    <slot name="heading">
      <SidebarNavHeading v-if="heading">
        {{ heading }}
      </SidebarNavHeading>
    </slot>

    <div class="flex flex-col divide-y-2 *:bg-background">
      <slot />
    </div>
  </div>
</template>
