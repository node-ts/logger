import { Logger } from '@node-ts/logger-core'
import winston from 'winston'
import autobind from 'autobind-decorator'

@autobind
export class WinstonLogger implements Logger  {

  constructor (
    private readonly winstonLogger: winston.Logger = winston.createLogger()
  ) {
  }

  debug (message: string, data?: object): void {
    log(this.winstonLogger.debug, message, data)
  }

  trace (message: string, data?: object): void {
    log(this.winstonLogger.verbose, message, data)
  }

  info (message: string, data?: object): void {
    log(this.winstonLogger.info, message, data)
  }

  warn (message: string, data?: object): void {
    log(this.winstonLogger.warn, message, data)
  }

  error (message: string, data?: object): void {
    log(this.winstonLogger.error, message, data)
  }

  fatal (message: string, data?: object): void {
    log(this.winstonLogger.crit, message, data)
  }

}

function log (
  // tslint:disable:no-any Node typings
  logFn: (message: string, ...optionalParams: any[]) => void,
  message: string,
  data?: object
): void {
  if (data) {
    logFn(message, data)
  } else {
    logFn(message)
  }
}
