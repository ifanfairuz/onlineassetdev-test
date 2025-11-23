import { RequestHandler } from 'express'
import z from 'zod'
import { getUsers } from '../services/user/get-user.service.ts'
import { createUser } from '../services/user/create-user.service.ts'

export const getUsersHandler: RequestHandler = async (req, res) => {
  const schema = z.object({
    page: z.coerce.number().min(1).default(1).optional(),
    per_page: z.coerce.number().min(1).max(100).default(10).optional(),
  })

  const { page, per_page } = schema.parse(req.query)
  const response = await getUsers(page, per_page)

  return res.json({
    data: response.data.map((user) => ({
      ...user,
      created_at: user.created_at.toISOString(),
      updated_at: user.updated_at.toISOString(),
    })),
    meta: {
      ...response.meta,
      fetched_at: response.meta.fetched_at?.toISOString(),
    },
  })
}

export const createUserHandler: RequestHandler = async (req, res) => {
  const schema = z.object({
    name: z.string().min(1).max(255),
    email: z.email().min(1).max(255),
  })

  const { name, email } = schema.parse(req.body)
  const user = await createUser({ name, email })

  return res.json(user)
}
