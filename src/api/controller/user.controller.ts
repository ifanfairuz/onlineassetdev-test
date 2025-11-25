import { RequestHandler } from 'express'
import { getUsers } from '../services/user/get-user.service.ts'
import { createUser } from '../services/user/create-user.service.ts'
import { paginationPayloadSchema } from '#shared/validation/pagination.schema'
import { createUserPayloadSchema } from '#shared/validation/user.schema'
import { ValidationException } from '#shared/exceptions/ValidationException'
import { DuplicateEmailException } from '../services/user/exceptions/DuplicateEmailException.ts'

/**
 * Get all users
 *
 * @param req
 * @param res
 * @returns
 */
export const getUsersHandler: RequestHandler = async (req, res) => {
  const { page, per_page } = paginationPayloadSchema.parse(req.query)
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

/**
 * Create a user
 *
 * @param req
 * @param res
 * @returns
 */
export const createUserHandler: RequestHandler = async (req, res) => {
  try {
    const { name, email } = createUserPayloadSchema.parse(req.body)
    const response = await createUser({ name, email })

    return res.json(response)
  } catch (error) {
    if (error instanceof DuplicateEmailException) {
      throw new ValidationException({
        email: 'Email already exists',
      })
    }

    if (error instanceof Error) {
      throw error
    }

    throw new Error('Internal Server Error')
  }
}
