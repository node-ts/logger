import { ContainerModule } from 'inversify'
import { PINO_SYMBOLS } from './pino-symbols'
import { LOGGER_SYMBOLS } from '@node-ts/logger-core'
import { DefaultPinoConfiguration } from './pino-configuration'
import { PinoLoggerFactory } from './pino-logger-factory'
export class PinoModule extends ContainerModule {
  constructor () {
    super((bind, _, __, rebind) => {
      bind(PINO_SYMBOLS.PinoConfiguration).to(DefaultPinoConfiguration)
      rebind(LOGGER_SYMBOLS.LoggerFactory).to(PinoLoggerFactory)
    })
  }
}
