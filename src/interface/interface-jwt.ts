export interface IJwt {
  generateToken(data: any, expired: string | number | null): Promise<string>
  verifyToken<T>(token: string): Promise<T>
}
