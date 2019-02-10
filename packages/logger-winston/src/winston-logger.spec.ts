import { WinstonLogger } from './winston-logger'
import { IMock, Mock, Times } from 'typemoq'
import winston from 'winston'

describe('winston-logger', () => {

  let sut: WinstonLogger
  let winstonLogger: IMock<winston.Logger>

  const message = 'log message'
  const meta = {}

  beforeEach(() => {
    winstonLogger = Mock.ofType<winston.Logger>()
    sut = new WinstonLogger(
      winstonLogger.object
    )
  })

  it('should log debug to debug', () => {
    sut.debug(message, meta)
    winstonLogger.verify(
      w => w.debug(message, meta),
      Times.once()
    )
  })

  it('should log trace to verbose', () => {
    sut.trace(message, meta)
    winstonLogger.verify(
      w => w.verbose(message, meta),
      Times.once()
    )
  })

  it('should log info to info', () => {
    sut.info(message, meta)
    winstonLogger.verify(
      w => w.info(message, meta),
      Times.once()
    )
  })

  it('should log warn to warn', () => {
    sut.warn(message, meta)
    winstonLogger.verify(
      w => w.warn(message, meta),
      Times.once()
    )
  })

  it('should log error to error', () => {
    sut.error(message, meta)
    winstonLogger.verify(
      w => w.error(message, meta),
      Times.once()
    )
  })

  it('should log fatal to crit', () => {
    sut.fatal(message, meta)
    winstonLogger.verify(
      w => w.crit(message, meta),
      Times.once()
    )
  })

})
