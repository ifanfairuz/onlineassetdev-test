<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const { params } = useRoute()
const error = computed(() => {
  switch (params.code) {
    case '404':
      return {
        code: 404,
        message: 'Page not found',
      }

    default:
      return {
        code: 500,
        message: 'Internal server error',
      }
  }
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-bold text-foreground/60">
        {{ error.code }}
      </h1>
      <p class="text-lg">{{ error.message }}</p>
      <Button class="mt-4" as-child>
        <router-link to="/"> Back to Home </router-link>
      </Button>
    </div>
  </div>
</template>
