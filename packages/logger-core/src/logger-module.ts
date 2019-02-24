import { ContainerModule } from 'inversify'
import { LOGGER_SYMBOLS } from './logger-symbols'
import { ConsoleLoggerFactory } from './console-logger-factory'
import { LoggerFactory } from './logger-factory'

export class LoggerModule extends ContainerModule {
  constructor () {
    super(bind => {
      bind(LOGGER_SYMBOLS.LoggerFactory).to(ConsoleLoggerFactory)
      bind(LOGGER_SYMBOLS.Logger).toDynamicValue(context => {
        const factory = context.container.get<LoggerFactory>(LOGGER_SYMBOLS.LoggerFactory)
        return factory.build('Application', context.container)
      })
    })
  }
}
