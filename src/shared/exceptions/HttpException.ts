import type { Request, Response } from 'express'

interface HttpExceptionOptions extends ErrorOptions {
  html?: string
}

export class HttpException extends Error {
  public name: string = 'HttpException'
  public statusCode: number
  public html?: string

  constructor(
    statusCode: number = 500,
    message: string = 'Internal Server Error',
    options?: HttpExceptionOptions,
  ) {
    super(message)
    this.statusCode = statusCode
    this.html = options?.html
    this.cause = options?.cause
  }

  public sendResponse(res: Response, req?: Request) {
    if (req?.headers.accept?.includes('application/json')) {
      res.status(this.statusCode).json({ message: this.message })
      return
    }

    if (this.html) {
      res.status(this.statusCode).set({ 'Content-Type': 'text/html' }).send(this.html)
    } else {
      res.status(this.statusCode).send(this.message)
    }
  }
}
