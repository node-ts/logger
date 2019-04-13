import { ConsoleLogger } from './console-logger'
import { IMock, Mock, Times } from 'typemoq'

describe('ConsoleLogger', () => {

  let sut: ConsoleLogger
  let jsConsole: IMock<Console>

  const name = 'console-logger-spec'
  const message = 'log message'
  const expectedMessage = `${name}: ${message}`
  const data = {}

  beforeEach(() => {
    jsConsole = Mock.ofType<Console>()
    sut = new ConsoleLogger(
      name,
      jsConsole.object
    )
  })

  it('should log debug to debug', () => {
    sut.debug(message, data)
    jsConsole.verify(
      c => c.debug(expectedMessage, data),
      Times.once()
    )
  })

  it('should log trace to debug', () => {
    sut.trace(message, data)
    jsConsole.verify(
      c => c.trace(expectedMessage, data),
      Times.once()
    )
  })

  it('should log info to info', () => {
    sut.info(message, data)
    jsConsole.verify(
      c => c.info(expectedMessage, data),
      Times.once()
    )
  })

  it('should log warn to warn', () => {
    sut.warn(message, data)
    jsConsole.verify(
      c => c.warn(expectedMessage, data),
      Times.once()
    )
  })

  it('should log error to error', () => {
    sut.error(message, data)
    jsConsole.verify(
      c => c.error(expectedMessage, data),
      Times.once()
    )
  })

  it('should log fatal to error', () => {
    sut.fatal(message, data)
    jsConsole.verify(
      c => c.error(expectedMessage, data),
      Times.once()
    )
  })
})
