import z from 'zod'

export const createUserPayloadSchema = z.object({
  name: z
    .string({ message: "Name can't be empty" })
    .min(1, "Name can't be empty")
    .max(255, "Name can't be more than 255 characters"),
  email: z
    .string({ message: "Email can't be empty" })
    .email('Email is invalid')
    .max(255, "Email can't be more than 255 characters")
    .transform((email) => email.toLowerCase()),
})
