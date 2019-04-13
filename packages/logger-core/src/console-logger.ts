import { Logger } from './logger'
import { injectable } from 'inversify'

@injectable()
export class ConsoleLogger implements Logger {

  /**
   * A default, console based logger
   * @param name Name of the logger to construct
   * @param jsConsole A reference to console. Primarily used to inject mocks during testing
   */
  constructor (
    private readonly name: string,
    private readonly jsConsole = console
  ) {
  }

  debug (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.jsConsole.debug.bind(this), this.name, message, data)
  }

  trace (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.jsConsole.debug.bind(this), this.name, message, data)
  }

  info (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.jsConsole.info.bind(this), this.name, message, data)
  }

  warn (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.jsConsole.warn.bind(this), this.name, message, data)
  }

  error (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.jsConsole.error.bind(this), this.name, message, data)
  }

  fatal (message: string, data?: object): void {
    // tslint:disable-next-line:no-unsafe-any Node typings
    log(this.jsConsole.error.bind(this), this.name, message, data)
  }
}

function log (
  // tslint:disable:no-any Method signature of node
  consoleLog: (message: string, ...optionalParams: any[]) => void,
  name: string,
  message: string,
  data?: object
): void {
  const namedMessage = `${name}: ${message}`
  if (data) {
    consoleLog(namedMessage, data)
  } else {
    consoleLog(namedMessage)
  }
}
