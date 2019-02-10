import { injectable } from 'inversify'
import winston from 'winston'

export interface WinstonConfiguration {
  getConfiguration (loggerName: string): winston.LoggerOptions
}

@injectable()
export class DefaultWinstonConfiguration implements WinstonConfiguration {
  getConfiguration (loggerName: string): winston.LoggerOptions {
    return {
      defaultMeta: { loggerName }
    }
  }
}
