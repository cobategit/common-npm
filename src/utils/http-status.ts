'use strict'
import dotenv from 'dotenv'
dotenv.config()

export const enum StatusType {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNSUPPORTED_ACTION = 405,
  VALIDATION_FAILED = 422,
  SERVER_ERROR = 500,
  CREATED = 201,
}

export class HttpStatus {
  protected static _hasOwnProperty = Object.prototype.hasOwnProperty
  protected static status: StatusType

  protected static statusMessage(status: StatusType) {
    switch (status) {
      case StatusType.OK:
        return 'Success'
      case StatusType.BAD_REQUEST:
        return 'Bad Request'
      case StatusType.UNAUTHORIZED:
        return 'Unauthorized'
      case StatusType.FORBIDDEN:
        return 'Forbidden'
      case StatusType.NOT_FOUND:
        return 'Not Found'
      case StatusType.UNSUPPORTED_ACTION:
        return 'Unsupported Action'
      case StatusType.VALIDATION_FAILED:
        return 'Validation Failed'
      case StatusType.SERVER_ERROR:
        return 'Internal Server Error'
      case StatusType.CREATED:
        return 'Created'
    }
  }

  protected static jsonResponse(res: any, body: any, options: any) {
    options = options || {}
    options.status = options.status || StatusType.OK
    res.status(options.status).send(body || null)
  }
}
