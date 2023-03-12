import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

interface TransporterAuth {
  user?: string
  pass?: string
}

interface TranspoterOptions {
  host?: string
  port?: number
  auth?: TransporterAuth
}

interface OptionsEmail {
  from?: string
  to?: string
  subject?: string
  html?: string
}

export const sendEmail = async (
  options: OptionsEmail,
  toptions: TranspoterOptions
) => {
  const transpoter = nodemailer.createTransport(toptions)
  await transpoter.sendMail(options)
}
