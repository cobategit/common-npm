import { createLogger, transports, Logger, format } from 'winston'
import { format as formatDate } from 'date-fns'
import path from 'path'
import fs from 'fs'
import 'winston-daily-rotate-file'

export class LoggersApp {
  private static logger: Logger
  private static logDirectory = path.join(process.cwd(), 'logs')

  private static CreateLogFolderIfNotExists() {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory)
    }
  }

  private static SetLogger() {
    const logFormat = format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`
    })
    this.logger = createLogger({
      format: format.combine(format.json(), format.timestamp(), logFormat),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: path.join(LoggersApp.logDirectory, 'starter-%DATE%.log'),
          datePattern: formatDate(new Date(), 'yyyy-MM-dd'),
          maxSize: '50mb',
          maxFiles: '30d',
          level: 'verbose',
        }),
      ],
      exitOnError: true,
    })
  }

  public static configureLogger() {
    this.CreateLogFolderIfNotExists()
    this.SetLogger()
  }

  private static GetValue(name: string, value: any) {
    if (typeof value === 'string') {
      return `${name} - ${value}`
    } else {
      return `${name} - ${JSON.stringify(value)}`
    }
  }

  public static debug(name: string, value: any) {
    this.logger.log('debug', this.GetValue(name, value))
  }

  public static error(name: string, value: any) {
    this.logger.log('error', this.GetValue(name, value))
  }

  public static warn(name: string, value: any) {
    this.logger.log('warn', this.GetValue(name, value))
  }

  public static info(name: string, value: any) {
    this.logger.log('info', this.GetValue(name, value))
  }
}
