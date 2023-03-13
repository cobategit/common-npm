import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export class TokenJWt {
  public static generateJwt = async (
    data: any,
    expired: string | number | null
  ): Promise<string> => {
    return jwt.sign(
      data,
      process.env.JWT_SECRET!,
      expired != null ? { expiresIn: expired } : {}
    )
  }

  public static verifyJwt = async (token: string): Promise<any> => {
    return jwt.verify(token, process.env.JWT_SECRET!)
  }
}
