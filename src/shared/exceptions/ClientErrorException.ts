export class ClientErrorException extends Error {
  public name = 'ClientErrorException'
  constructor(message: string) {
    super(message)
  }
}
