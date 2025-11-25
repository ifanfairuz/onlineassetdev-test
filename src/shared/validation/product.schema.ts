import z from 'zod'

export const createProductPayloadSchema = z.object({
  name: z
    .string("Name can't be empty")
    .min(1, "Name can't be empty")
    .max(255, "Name can't be more than 255 characters"),
  price: z.coerce
    .number("Price can't be empty")
    .min(1, "Price can't be empty")
    .max(1_000_000_000, "Price can't be more than 1,000,000,000"),
  category: z
    .string("Category can't be empty")
    .min(1, "Category can't be empty")
    .max(255, "Category can't be more than 255 characters"),
})
