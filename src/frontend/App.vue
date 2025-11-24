<script setup lang="ts">
import { provideApiClient } from './api'
import { provideColorSchema } from './lib/color-schema'

provideApiClient()
provideColorSchema()
</script>

<template>
  <router-view />
</template>
