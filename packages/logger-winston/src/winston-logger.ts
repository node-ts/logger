import { Logger } from '@node-ts/logger-core'
import winston from 'winston'

export class WinstonLogger implements Logger  {

  constructor (
    private readonly winstonLogger: winston.Logger = winston.createLogger()
  ) {
  }

  debug (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.winstonLogger.debug.bind(this), message, data)
  }

  trace (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.winstonLogger.verbose.bind(this), message, data)
  }

  info (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.winstonLogger.info.bind(this), message, data)
  }

  warn (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.winstonLogger.warn.bind(this), message, data)
  }

  error (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.winstonLogger.error.bind(this), message, data)
  }

  fatal (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.winstonLogger.crit.bind(this), message, data)
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
