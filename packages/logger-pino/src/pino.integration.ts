import { Container, ContainerModule, injectable, inject } from 'inversify'
import { LoggerModule, LOGGER_SYMBOLS, Logger, bindLogger } from '@node-ts/logger-core'
import { PinoModule } from './pino-module'
import { PinoLogger } from './pino-logger'

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

describe('pino', () => {
  let service: TestService

  beforeAll(() => {
    const container = new Container()
    container.load(new LoggerModule())
    container.load(new PinoModule())
    container.load(new TestModule())

    service = container.get(TestService)
  })

  describe('after binding', () => {
    it('should inject pino based loggers', () => {
      expect(service.logger).toBeInstanceOf(PinoLogger)
    })
  })

  describe('when logging', () => {
    it('should log to info', () => {
      service.logger.info('pino')
    })
    it('should log to fatal', () => {
      service.logger.fatal('pino')
    })
    it('should log to trace', () => {
      service.logger.trace('pino')
    })
    it('should log to warn', () => {
      service.logger.warn('pino')
    })
    it('should log to error', () => {
      service.logger.error('pino')
    })
  })

})
