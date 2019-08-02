// tslint:disable:max-classes-per-file no-unsafe-any no-any
import { Container, injectable, inject } from 'inversify'
import { LoggerModule } from './logger-module'
import { LOGGER_SYMBOLS } from './logger-symbols'
import { Logger } from './logger'
import { bindLogger } from './bind-logger'
import { IMock, Times, Mock, It } from 'typemoq'
import { ConsoleLogger } from './console-logger'
import { ConsoleLoggerFactory } from './console-logger-factory'

@injectable()
class TestClass {

  constructor (
    @inject(LOGGER_SYMBOLS.Logger) readonly logger: Logger
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

    const factory = Mock.ofType<ConsoleLoggerFactory>()
    factory
      .setup(f => f.build(TestClass.name, It.isAny()))
      .returns(() => consoleLogger.object)
    container.rebind(LOGGER_SYMBOLS.LoggerFactory).toConstantValue(factory.object)

    container.bind(TestClass).to(TestClass)
    bindLogger(
      (serviceIdentifier: any) => container.bind(serviceIdentifier),
      TestClass
    )
    testClass = container.get(TestClass)
  })

  describe('after binding', () => {
    it('should inject console based loggers', () => {
      expect(testClass.logger).toEqual(consoleLogger.object)
    })
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
