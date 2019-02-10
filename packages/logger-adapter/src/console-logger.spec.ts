import { ConsoleLogger } from './console-logger'
import { IMock, Mock, Times } from 'typemoq'

describe('ConsoleLogger', () => {

  let sut: ConsoleLogger
  let jsConsole: IMock<Console>

  const message = 'log message'
  const meta = {}

  beforeEach(() => {
    jsConsole = Mock.ofType<Console>()
    sut = new ConsoleLogger(
      jsConsole.object
    )
  })

  it('should log debug to debug', () => {
    sut.debug(message, meta)
    jsConsole.verify(
      c => c.debug(message, meta),
      Times.once()
    )
  })

  it('should log trace to trace', () => {
    sut.trace(message, meta)
    jsConsole.verify(
      c => c.trace(message, meta),
      Times.once()
    )
  })

  it('should log info to info', () => {
    sut.info(message, meta)
    jsConsole.verify(
      c => c.info(message, meta),
      Times.once()
    )
  })

  it('should log warn to warn', () => {
    sut.warn(message, meta)
    jsConsole.verify(
      c => c.warn(message, meta),
      Times.once()
    )
  })

  it('should log error to error', () => {
    sut.error(message, meta)
    jsConsole.verify(
      c => c.error(message, meta),
      Times.once()
    )
  })

  it('should log fatal to error', () => {
    sut.fatal(message, meta)
    jsConsole.verify(
      c => c.error(message, meta),
      Times.once()
    )
  })
})
