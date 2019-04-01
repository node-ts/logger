// tslint:disable:max-classes-per-file

import { Container, injectable, inject } from 'inversify'
import { LoggerModule } from './logger-module'
import { LOGGER_SYMBOLS } from './logger-symbols'
import { Logger } from './logger'
import { bindLogger } from './bind-logger'
import { IMock, Times, Mock } from 'typemoq'
import { ConsoleLogger } from './console-logger'

@injectable()
class TestClass {

  constructor (
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger
  ) {
  }

  info (message: string): void {
    this.logger.info(message)
  }
}

describe('Logger', () => {
  let container: Container
  let testClass: TestClass
  let consoleLogger: IMock<ConsoleLogger>

  beforeAll(() => {
    container = new Container()
    container.load(new LoggerModule())
    consoleLogger = Mock.ofType<ConsoleLogger>()
    container.bind(LOGGER_SYMBOLS.Logger).toConstantValue(consoleLogger.object)

    container.bind(TestClass).to(TestClass)
    // tslint:disable-next-line:no-unbound-method no-unsafe-any no-invalid-this
    bindLogger(container.bind.bind(this), TestClass)
    testClass = container.get(TestClass)
  })

  describe('when logging to info', () => {
    it('should invoke info on the logger implementation', () => {
      testClass.info('test')
      consoleLogger.verify(
        l => l.info('test'),
        Times.once()
      )
    })
  })
})
