import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { AppError, LoggersApp, TokenJWt } from '..'
import dotenv from 'dotenv'
dotenv.config()

export const reqAuthToken = async (req: any, rep: any, done: any) => {
  const token = req.headers['x-access-token']
  if (!token) {
    done(
      new AppError(400, false, `auth token jwt headers tidak ditemukan`, '111')
    )
  }

  try {
    const resToken = await TokenJWt.verifyJwt(token as string)

    req.user = resToken
  } catch (error) {
    LoggersApp.warn('catch-auth-token', error)

    if (error instanceof TokenExpiredError) {
      throw new AppError(403, false, `jwt token expired`, '111')
    }

    if (error instanceof JsonWebTokenError) {
      throw new AppError(403, false, `invalid token jwt`, '111')
    }

    throw new AppError(403, false, `${JSON.stringify(error)}`, '111')
  }
}

export const reqXApiKey = async (req: any, rep: any, done: any) => {
  let token: string | string[] | undefined

  if (req.headers['x-api-key']) {
    try {
      token = req.headers['x-api-key'] as string

      const decoded = Buffer.from(token, 'base64').toString('ascii')

      if (decoded != process.env.X_API_KEY!) {
        return done(new AppError(403, false, 'x-api-key tidak matching', '111'))
      }
    } catch (error) {
      LoggersApp.warn('catch-xpikey', error)
      throw new AppError(
        403,
        false,
        'Terjadi kesalahan matching x-api-key',
        '111'
      )
    }
  }

  if (!token) {
    return done(
      new AppError(
        403,
        false,
        'Terjadi kesalahan x-api-key tidak ditemukan',
        '111'
      )
    )
  }
}
