import { injectable } from 'inversify'
import winston, { format, transports } from 'winston'

export interface WinstonConfiguration {
  getConfiguration (): winston.LoggerOptions
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
  getConfiguration (): winston.LoggerOptions {
    return {
      transports: [consoleTransport],
      format: format.combine(
        format.timestamp(),
        errorStackFormat(),
        format.json()
      )
    }
  }
}
