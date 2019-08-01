import { Logger } from '@node-ts/logger-core'
import winston from 'winston'
import autobind from 'autobind-decorator'

@autobind
export class WinstonLogger implements Logger  {

  constructor (
    private readonly name: string,
    private readonly winstonLogger: winston.Logger = winston.createLogger()
  ) {
  }

  debug (message: string, data?: object): void {
    log(this.winstonLogger.debug, message, this.name, data)
  }

  trace (message: string, data?: object): void {
    log(this.winstonLogger.verbose, message, this.name, data)
  }

  info (message: string, data?: object): void {
    log(this.winstonLogger.info, message, this.name, data)
  }

  warn (message: string, data?: object): void {
    log(this.winstonLogger.warn, message, this.name, data)
  }

  error (message: string, data?: object): void {
    log(this.winstonLogger.error, message, this.name, data)
  }

  fatal (message: string, data?: object): void {
    log(this.winstonLogger.crit, message, this.name, data)
  }
}

function log (
  // tslint:disable:no-any Node typings
  logFn: (message: string, ...optionalParams: any[]) => void,
  message: string,
  name: string,
  data?: object
): void {
  const meta = merge(name, data)
  logFn(message, meta)
}

function merge (name: string, meta: object | undefined): object {
  return {
    name,
    ...meta
  }
}
