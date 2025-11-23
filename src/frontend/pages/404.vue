<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-bold text-foreground/60">404</h1>
      <p class="text-lg">Page not found</p>
      <Button class="mt-4" to="/"> Back to Home </Button>
    </div>
  </div>
</template>
