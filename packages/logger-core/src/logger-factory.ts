import { Logger } from './logger'
import { interfaces } from 'inversify'

export interface LoggerFactory {
  /**
   * Builds a new Logger
   * @param loggerName Name of the logger, or the target of the logger. Usually the class name that it's injected into.
   * @param container The inversify application container that can be used to construct loggers etc
   */
  build (loggerName: string, container: interfaces.Container): Logger
}
