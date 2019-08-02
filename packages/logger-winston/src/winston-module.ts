import { ContainerModule } from 'inversify'
import { LOGGER_SYMBOLS } from '@node-ts/logger-core'
import { WinstonLoggerFactory } from './winston-logger-factory'
import { WINSTON_SYMBOLS } from './winston-symbols'
import { DefaultWinstonConfiguration, WinstonConfiguration } from './winston-configuration'
import { WINSTON_INTERNAL_SYMBOLS } from './winston-internal-symbols'
import { createLogger } from 'winston'

export class WinstonModule extends ContainerModule {
  constructor () {
    super((bind, _, __, rebind) => {
      bind(WINSTON_SYMBOLS.WinstonConfiguration).to(DefaultWinstonConfiguration)
      rebind(LOGGER_SYMBOLS.LoggerFactory).to(WinstonLoggerFactory)

      // We want a singleton instance of Winston - otherwise it floods the app with event emitters
      bind(WINSTON_INTERNAL_SYMBOLS.WinstonInstance)
        .toDynamicValue(context => {
          const configurer = context.container.get<WinstonConfiguration>(WINSTON_SYMBOLS.WinstonConfiguration)
          const configuration = configurer.getConfiguration()
          return createLogger(configuration)
        })
        .inSingletonScope()
    })
  }
}
