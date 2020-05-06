import { injectable } from 'inversify'
import * as pino from 'pino'

export interface PinoConfiguration {
  getConfiguration (loggerName: string): pino.LoggerOptions
}

@injectable()
export class DefaultPinoConfiguration implements PinoConfiguration {
  getConfiguration (loggerName: string): pino.LoggerOptions {
    return {
      enabled : true,
      name : loggerName,
      level : 'info',
      prettyPrint : false
    }
  }
}
