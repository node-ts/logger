import { ContainerModule } from 'inversify'
import { LOGGER_SYMBOLS } from './logger-symbols'
import { ConsoleLoggerFactory } from './console-logger-factory'

export class LoggerModule extends ContainerModule {
  constructor () {
    super(bind => {
      bind(LOGGER_SYMBOLS.LoggerFactory).to(ConsoleLoggerFactory)
    })
  }
}
