import { Container, ContainerModule, injectable, inject } from 'inversify'
import { LoggerModule, LOGGER_SYMBOLS, Logger, bindLogger } from '@node-ts/logger-core'
import { WinstonModule } from './winston-module'
import { WinstonLogger } from './winston-logger'

// tslint:disable:max-classes-per-file
@injectable()
class TestService {

  constructor (
    @inject(LOGGER_SYMBOLS.Logger) readonly logger: Logger
  ) {
  }
}

class TestModule extends ContainerModule {
  constructor () {
    super(bind => {
      bind(TestService).toSelf()
      bindLogger(bind, TestService)
    })
  }
}

describe('Winston', () => {
  let service: TestService

  beforeAll(() => {
    const container = new Container()
    container.load(new LoggerModule())
    container.load(new WinstonModule())
    container.load(new TestModule())

    service = container.get(TestService)
  })

  describe('after binding', () => {
    it('should inject Winston based loggers', () => {
      expect(service.logger).toBeInstanceOf(WinstonLogger)
    })
  })

  describe('when logging', () => {
    it('should log to info', () => {
      service.logger.info('winston')
    })
  })

})
