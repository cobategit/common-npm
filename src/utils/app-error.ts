export class AppError extends Error {
  statusCode: number
  code: string
  status: boolean

  constructor(
    statusCode: number,
    status: boolean,
    message: string,
    code: string
  ) {
    super(message)

    this.statusCode = statusCode
    this.message = message
    this.code = code
    this.status = status

    Object.setPrototypeOf(this, AppError.prototype)
  }

  serializeErrors() {
    return {
      statusCode: this.statusCode,
      status: this.status,
      message: this.message,
      response_code: this.code,
    }
  }
}
