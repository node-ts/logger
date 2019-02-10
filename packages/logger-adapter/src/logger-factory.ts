import { Logger } from './logger'

export interface LoggerFactory {
  /**
   * Builds a new Logger
   * @param loggerName Name of the logger, or the target of the logger. Usually the class name that it's injected into.
   */
  build (loggerName: string): Logger
}
