import { ErrorRequestHandler, Router, type Application } from 'express'
import { HttpException } from './shared/exceptions/HttpException.ts'
import { createUserApi } from './api/router/user.router.ts'
import { createProductApi } from './api/router/product.router.ts'

export default async function bindApi(app: Application) {
  const router = Router()
  createUserApi(router)
  createProductApi(router)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err)

    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ message: err.message })
    }

    return res.status(500).json({ message: 'Internal Server Error' })
  }

  app.use('/api', router, errorHandler)
}
