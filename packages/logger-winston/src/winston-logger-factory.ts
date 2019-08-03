import { LoggerFactory, Logger } from '@node-ts/logger-core'
import { interfaces, injectable } from 'inversify'
import { WinstonLogger } from './winston-logger'
import { WINSTON_INTERNAL_SYMBOLS } from './winston-internal-symbols'
import { Logger as WinstonInstance } from 'winston'

@injectable()
export class WinstonLoggerFactory implements LoggerFactory {
  build (loggerName: string, container: interfaces.Container): Logger {
    const winstonLogger = container.get<WinstonInstance>(WINSTON_INTERNAL_SYMBOLS.WinstonInstance)
    return new WinstonLogger(loggerName, winstonLogger)
  }
}
