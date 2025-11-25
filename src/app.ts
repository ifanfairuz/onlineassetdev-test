import 'dotenv/config'

import express, { ErrorRequestHandler } from 'express'

import bindApi from './api.ts'
import bindFrontend from '#frontend'
import { HttpException } from '#shared/exceptions/HttpException'

const base = process.env.BASE_URL ?? '/'
const ssr = process.env.DISABLE_SSR !== 'true'

const app = express()
await bindApi(app)
await bindFrontend(app, { base, ssr })

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    return err.sendResponse(res, req)
  }

  if (req.headers.accept?.includes('application/json')) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }

  if (process.env.NODE_ENV === 'production') {
    return res.redirect('/error/500')
  }

  next(err)
}

app.use(errorHandler)

export { app }
