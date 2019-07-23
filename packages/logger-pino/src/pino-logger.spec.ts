import { PinoLogger } from './pino-logger'
import { IMock, Mock, Times } from 'typemoq'
import pino from 'pino'

describe('pino-logger', () => {

  let sut: PinoLogger
  let pinoLogger: IMock<pino.Logger>

  const message = 'log message'
  const data = {}

  beforeEach(() => {
    pinoLogger = Mock.ofType<pino.Logger>()
    sut = new PinoLogger(
      pinoLogger.object
    )
  })

  it('should log debug to debug', () => {
    sut.debug(message, data)
    pinoLogger.verify(
      w => w.debug(message, data),
      Times.once()
    )
  })

  it('should log trace to trace', () => {
    sut.trace(message, data)
    pinoLogger.verify(
      w => w.trace(message, data),
      Times.once()
    )
  })

  it('should log info to info', () => {
    sut.info(message, data)
    pinoLogger.verify(
      w => w.info(message, data),
      Times.once()
    )
  })

  it('should log warn to warn', () => {
    sut.warn(message, data)
    pinoLogger.verify(
      w => w.warn(message, data),
      Times.once()
    )
  })

  it('should log error to error', () => {
    sut.error(message, data)
    pinoLogger.verify(
      w => w.error(message, data),
      Times.once()
    )
  })

  it('should log fatal to fatal', () => {
    sut.fatal(message, data)
    pinoLogger.verify(
      w => w.fatal(message, data),
      Times.once()
    )
  })

})
