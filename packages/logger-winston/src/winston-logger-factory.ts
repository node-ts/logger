import { LoggerFactory, Logger } from '@node-ts/logger-core'
import { interfaces, injectable } from 'inversify'
import { createLogger } from 'winston'
import { WinstonLogger } from './winston-logger'
import { WinstonConfiguration } from './winston-configuration'
import { WINSTON_SYMBOLS } from './winston-symbols'

@injectable()
export class WinstonLoggerFactory implements LoggerFactory {
  build (loggerName: string, container: interfaces.Container): Logger {
    const configurer = container.get<WinstonConfiguration>(WINSTON_SYMBOLS.WinstonConfiguration)
    const configuration = configurer.getConfiguration(loggerName)
    const winstonLogger = createLogger(configuration)
    return new WinstonLogger(winstonLogger)
  }
}
