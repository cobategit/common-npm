'use strict'
import dotenv from 'dotenv'
dotenv.config()
import { LoggersApp, HttpStatus, StatusType } from './index'

export class ApiResponse extends HttpStatus {
  public static ok(request: any, res: any, data: any) {
    HttpStatus.jsonResponse(res, data, {
      status: StatusType.OK,
    })
  }

  public static badRequest(request: any, res: any, errors: any) {
    errors = Array.isArray(errors) ? errors : [errors]

    const body = {
      message: HttpStatus.statusMessage(StatusType.BAD_REQUEST),
      errors,
    }

    HttpStatus.jsonResponse(res, body, {
      status: StatusType.BAD_REQUEST,
    })
  }

  public static unauthorized(error: any, request: any, res: any) {
    const body = {
      message: HttpStatus.statusMessage(StatusType.UNAUTHORIZED),
      error,
    }

    HttpStatus.jsonResponse(res, body, {
      status: StatusType.UNAUTHORIZED,
    })
  }

  public static forbidden(request: any, res: any) {
    const body = {
      message: HttpStatus.statusMessage(StatusType.FORBIDDEN),
    }

    HttpStatus.jsonResponse(res, body, {
      status: StatusType.FORBIDDEN,
    })
  }

  public static notFound(request: any, res: any) {
    const body = {
      message: HttpStatus.statusMessage(StatusType.NOT_FOUND),
    }

    HttpStatus.jsonResponse(res, body, {
      status: StatusType.NOT_FOUND,
    })
  }

  public static unsupportedAction(request: any, res: any) {
    const body = {
      message: HttpStatus.statusMessage(StatusType.UNSUPPORTED_ACTION),
    }

    HttpStatus.jsonResponse(res, body, {
      status: StatusType.UNSUPPORTED_ACTION,
    })
  }

  public static invalid(request: any, res: any, errors: any) {
    errors = Array.isArray(errors) ? errors : [errors]

    const body = {
      message: HttpStatus.statusMessage(StatusType.VALIDATION_FAILED),
      errors,
    }

    HttpStatus.jsonResponse(res, body, {
      status: StatusType.VALIDATION_FAILED,
    })
  }

  public static serverError(request: any, res: any, error: any) {
    if (error instanceof Error) {
      error = {
        message: error.message,
        stacktrace: error.stack,
      }
    }
    const body = {
      message: HttpStatus.statusMessage(StatusType.SERVER_ERROR),
      error,
    }

    HttpStatus.jsonResponse(res, body, {
      status: StatusType.SERVER_ERROR,
    })
  }

  public static requireParams(
    request: any,
    res: any,
    parameters: any,
    next: any
  ) {
    const missing: any[] = []

    parameters = Array.isArray(parameters) ? parameters : [parameters]

    parameters.forEach((parameter: any) => {
      if (
        !(
          request.body &&
          HttpStatus._hasOwnProperty.call(request.body, parameter)
        ) &&
        !(
          request.params &&
          HttpStatus._hasOwnProperty.call(request.params, parameter)
        ) &&
        !HttpStatus._hasOwnProperty.call(request.query, parameter)
      ) {
        missing.push(`Missing required parameter: ${parameter}`)
      }
    })

    if (missing.length) {
      ApiResponse.badRequest(request, res, missing)
    } else {
      next()
    }
  }

  public static created(request: any, res: any, data: any) {
    HttpStatus.jsonResponse(res, data, {
      status: StatusType.CREATED,
    })
  }

  public static requireHeaders(
    request: any,
    res: any,
    headers: any,
    next: any
  ) {
    const missing: any[] = []

    headers = Array.isArray(headers) ? headers : [headers]

    headers.forEach((header: any) => {
      if (
        !(
          request.headers &&
          HttpStatus._hasOwnProperty.call(request.headers, header)
        )
      ) {
        missing.push(`Missing required header parameter: ${header}`)
      }
    })

    if (missing.length) {
      ApiResponse.badRequest(request, res, missing)
    } else {
      next()
    }
  }

  public static errorCatch(error: any, req: any, res: any) {
    let body = {}
    if (process.env.NODE_ENV == 'DEVELOPMENT') {
      body = {
        status: error.status,
        response_code: error.code,
        message: error.message,
        stack: error.stack,
      }
    }

    if (process.env.NODE_ENV == 'PRODUCTION') {
      body = {
        status: error.status,
        response_code: error.code,
        message: error.message,
      }
    } else {
      if (error.isOperational)
        res.status(500).send({
          status: 'Error',
          message: 'Something when wrong on server',
          error: error,
        })
    }

    LoggersApp.warn('error-catch', body)

    HttpStatus.jsonResponse(res, body, {
      status: error.statusCode,
    })
  }
}
