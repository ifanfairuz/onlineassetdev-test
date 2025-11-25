<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import { provideColorSchema } from './lib/color-schema'

provideColorSchema()
</script>

<template>
  <router-view />
  <Toaster theme="system" />
</template>
