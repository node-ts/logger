import { ContainerModule } from 'inversify'
import { LOGGER_SYMBOLS } from '@node-ts/logger-core'
import { WinstonLoggerFactory } from './winston-logger-factory'
import { WINSTON_SYMBOLS } from './winston-symbols'
import { DefaultWinstonConfiguration } from './winston-configuration'

export class WinstonModule extends ContainerModule {
  constructor () {
    super((bind, _, __, rebind) => {
      bind(WINSTON_SYMBOLS.WinstonConfiguration).to(DefaultWinstonConfiguration)
      rebind(LOGGER_SYMBOLS.LoggerFactory).to(WinstonLoggerFactory)
    })
  }
}
