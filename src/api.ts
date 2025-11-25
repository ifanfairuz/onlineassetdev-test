import { ErrorRequestHandler, json, Router, type Application } from 'express'
import { HttpException } from '#shared/exceptions/HttpException'
import { createUserApi } from './api/router/user.router.ts'
import { createProductApi } from './api/router/product.router.ts'
import { ZodError } from 'zod'
import { ValidationException } from '#shared/exceptions/ValidationException'

export default async function bindApi(app: Application) {
  const router = Router()
  createUserApi(router)
  createProductApi(router)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error('request error', err)

    if (err instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation Error',
        errors: ValidationException.parseZodError(err),
      })
    }

    if (err instanceof ValidationException) {
      return res.status(400).json({ message: 'Validation Error', errors: err.data })
    }

    if (err instanceof HttpException) {
      return res.status(err.statusCode).json({ message: err.message })
    }

    return res.status(500).json({ message: 'Internal Server Error' })
  }

  app.use('/api', json(), router, errorHandler)
}
