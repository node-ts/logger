import { Logger } from '@node-ts/logger-core'
import * as pino from 'pino'
import autobind from 'autobind-decorator'

@autobind
export class PinoLogger implements Logger  {

  constructor (
    private readonly pinoLogger: pino.BaseLogger = pino()
  ) {
  }

  debug (message: string, data?: object): void {
    this.pinoLogger.debug(message, data)
  }

  trace (message: string, data?: object): void {
    this.pinoLogger.trace(message, data)
  }

  info (message: string, data?: object): void {
    this.pinoLogger.info(message, data)
  }

  warn (message: string, data?: object): void {
    this.pinoLogger.warn(message, data)
  }

  error (message: string, data?: object): void {
    this.pinoLogger.error(message, data)
  }

  fatal (message: string, data?: object): void {
    this.pinoLogger.fatal(message, data)
  }
}

