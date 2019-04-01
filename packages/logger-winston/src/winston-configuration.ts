import { injectable } from 'inversify'
import winston, { format, transports } from 'winston'

export interface WinstonConfiguration {
  getConfiguration (loggerName: string): winston.LoggerOptions
}

const consoleTransport = new transports.Console({
  handleExceptions: true
})

const errorStackFormat = format(info => {
  if (info instanceof Error) {
    return {
      ...info,
      stack: info.stack,
      message: info.message
    }
  }
  return info
})

@injectable()
export class DefaultWinstonConfiguration implements WinstonConfiguration {
  getConfiguration (loggerName: string): winston.LoggerOptions {
    return {
      defaultMeta: { loggerName },
      transports: [consoleTransport],
      format: format.combine(
        format.timestamp(),
        errorStackFormat(),
        format.json()
      )
    }
  }
}
