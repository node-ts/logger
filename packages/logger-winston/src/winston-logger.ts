import { Logger } from '@node-ts/logger-adapter'
import { createLogger } from 'winston'

const winstonLogger = createLogger()

export class WinstonLogger implements Logger  {

  debug (message: string, meta?: object): void {
    winstonLogger.debug(message, meta)
  }

  trace (message: string, meta?: object): void {
    winstonLogger.verbose(message, meta)
  }

  info (message: string, meta?: object): void {
    winstonLogger.info(message, meta)
  }

  warn (message: string, meta?: object): void {
    winstonLogger.warn(message, meta)
  }

  error (message: string, meta?: object): void {
    winstonLogger.error(message, meta)
  }

  fatal (message: string, meta?: object): void {
    winstonLogger.crit(message, meta)
  }

}
