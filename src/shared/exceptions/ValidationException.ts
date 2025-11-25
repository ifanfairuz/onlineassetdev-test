import { ZodError } from 'zod'

export type ValidationExceptionData = Record<string, string>

export class ValidationException extends Error {
  public name = 'ValidationException'
  public constructor(public readonly data: ValidationExceptionData) {
    super('ValidationException')
  }

  static parseZodError(error: ZodError) {
    return error.issues.reduce<ValidationExceptionData>((data, issue) => {
      data[issue.path.join('.')] = issue.message
      return data
    }, {})
  }
}
