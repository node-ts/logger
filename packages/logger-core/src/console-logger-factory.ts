import { injectable, interfaces } from 'inversify'
import { LoggerFactory } from './logger-factory'
import { ConsoleLogger } from './console-logger'
import { Logger } from './logger'

@injectable()
export class ConsoleLoggerFactory implements LoggerFactory {
  build (name: string, _: interfaces.Container): Logger {
    return new ConsoleLogger(name)
  }
}
