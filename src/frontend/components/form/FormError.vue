<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <p class="text-sm text-destructive/60" v-if="!!message?.length">
    {{ message }}
  </p>
</template>
