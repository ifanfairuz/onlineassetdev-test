<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { Field, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import Button from '@/components/Button.vue'
import { FormError, Input, Label } from '@/components/form'

import { useApiClient } from '@/api'
import { ValidationException } from '@shared/exceptions/ValidationException'
import { createUserPayloadSchema } from '@shared/validation/user.schema'

const api = useApiClient()
const router = useRouter()
const loading = ref(false)

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(createUserPayloadSchema),
})

const submit = handleSubmit(async (data) => {
  try {
    loading.value = true
    await api.user.createUser(data)
    toast.success('User created successfully')
    router.replace('/users')
  } catch (error: unknown) {
    if (error instanceof ValidationException) {
      setErrors(error.data)
    } else {
      toast.error('Something went wrong, please try again')
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form class="flex flex-col gap-4 max-w-xl" @submit.prevent="submit">
    <h1 class="text-xl font-bold">Create User</h1>
    <div class="flex flex-col gap-2">
      <Field class="flex flex-col gap-2" name="name" v-slot="{ componentField, errorMessage }">
        <Label for="name">Name</Label>
        <Input id="name" :disabled="loading" autocomplete="name" v-bind="componentField" />
        <FormError :message="errorMessage" />
      </Field>
      <Field class="flex flex-col gap-2" name="email" v-slot="{ componentField, errorMessage }">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          :disabled="loading"
          autocomplete="email"
          v-bind="componentField"
        />
        <FormError :message="errorMessage" />
      </Field>
    </div>

    <div class="flex justify-end">
      <Button type="submit" :loading="loading">Create</Button>
    </div>
  </form>
</template>
