export class AppError extends Error {
  statusCode: number
  code: string
  success: boolean

  constructor(
    statusCode: number,
    success: boolean,
    message: string,
    code: string
  ) {
    super(message)

    this.statusCode = statusCode
    this.message = message
    this.code = code
    this.success = success

    Object.setPrototypeOf(this, AppError.prototype)
  }

  serializeErrors() {
    return {
      statusCode: this.statusCode,
      success: this.success,
      message: this.message,
      response_code: this.code,
    }
  }
}
