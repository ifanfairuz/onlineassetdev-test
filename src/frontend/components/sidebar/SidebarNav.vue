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

    <div class="flex flex-col bg-background rounded-md overflow-hidden divide-y">
      <slot />
    </div>
  </div>
</template>
