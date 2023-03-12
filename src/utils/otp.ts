export const generateOtp = (otpLength: number): Promise<string> => {
  let digits = '0123456789'
  let otp: string = ''

  for (let index = 0; index < otpLength; index) {
    otp += digits[Math.floor(Math.random() * 10)]
  }

  return Promise.resolve(otp)
}
