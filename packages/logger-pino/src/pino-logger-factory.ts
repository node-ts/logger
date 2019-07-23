import { LoggerFactory, Logger } from '@node-ts/logger-core'
import { interfaces, injectable } from 'inversify'
import * as pino from 'pino'
import { PinoConfiguration } from './pino-configuration'
import { PINO_SYMBOLS } from './pino-symbols'
import { PinoLogger } from './pino-logger';
@injectable()
class PinoLoggerFactory implements LoggerFactory {
  build (loggerName: string, container: interfaces.Container): Logger {
    const configurer = container.get<PinoConfiguration>(PINO_SYMBOLS.PinoConfiguration)
    const configuration = configurer.getConfiguration(loggerName)
    return new PinoLogger(pino(configuration))
  }
}
export { PinoLoggerFactory }
