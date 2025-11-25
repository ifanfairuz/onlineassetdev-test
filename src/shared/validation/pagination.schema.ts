import z from 'zod'

export const paginationPayloadSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  per_page: z.coerce.number().min(1).max(100).default(10),
})
