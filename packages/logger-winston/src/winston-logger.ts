import { Logger } from '@node-ts/logger-adapter'
import winston from 'winston'

export class WinstonLogger implements Logger  {

  constructor (
    private readonly winstonLogger: winston.Logger = winston.createLogger()
  ) {
  }

  debug (message: string, meta?: object): void {
    this.winstonLogger.debug(message, meta)
  }

  trace (message: string, meta?: object): void {
    this.winstonLogger.verbose(message, meta)
  }

  info (message: string, meta?: object): void {
    this.winstonLogger.info(message, meta)
  }

  warn (message: string, meta?: object): void {
    this.winstonLogger.warn(message, meta)
  }

  error (message: string, meta?: object): void {
    this.winstonLogger.error(message, meta)
  }

  fatal (message: string, meta?: object): void {
    this.winstonLogger.crit(message, meta)
  }

}
