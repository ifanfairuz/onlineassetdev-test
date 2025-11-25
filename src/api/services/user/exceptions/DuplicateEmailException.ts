export class DuplicateEmailException extends Error {
  public name = 'DuplicateEmailException'
  constructor() {
    super('Email already exists')
  }
}
