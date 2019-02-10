import { Logger } from './logger'

export class ConsoleLogger implements Logger {

  constructor (
    private readonly jsConsole: Console = console
  ) {
  }

  debug (message: string, meta?: object): void {
    this.jsConsole.debug(message, meta)
  }

  trace (message: string, meta?: object): void {
    this.jsConsole.trace(message, meta)
  }

  info (message: string, meta?: object): void {
    this.jsConsole.info(message, meta)
  }

  warn (message: string, meta?: object): void {
    this.jsConsole.warn(message, meta)
  }

  error (message: string, meta?: object): void {
    this.jsConsole.error(message, meta)
  }

  fatal (message: string, meta?: object): void {
    this.jsConsole.error(message, meta)
  }
}
