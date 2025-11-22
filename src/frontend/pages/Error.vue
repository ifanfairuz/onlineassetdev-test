<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-bold text-foreground/60">500</h1>
      <p class="text-lg">Internal Server Error</p>
      <Button class="mt-4" as-child>
        <router-link to="/"> Back to Home </router-link>
      </Button>
    </div>
  </div>
</template>
