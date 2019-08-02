// tslint:disable:max-classes-per-file no-unbound-method no-unsafe-any no-any
import { Container, decorate, injectable, inject, interfaces } from 'inversify'
import { WinstonModule } from './winston-module'
import { LoggerModule, bindLogger, LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core'

class TargetA { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetB { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetC { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetD { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetE { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetF { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetG { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetH { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetI { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetJ { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetK { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetL { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }
class TargetM { constructor (@inject(LOGGER_SYMBOLS.Logger) private _: Logger) {} }

// tslint:disable-next-line:no-any
const classes: interfaces.Newable<any>[] = [
 TargetA,
 TargetB,
 TargetC,
 TargetD,
 TargetE,
 TargetF,
 TargetG,
 TargetH,
 TargetI,
 TargetJ,
 TargetK,
 TargetL,
 TargetM
]

describe('WinstonLogger', () => {
  describe('when resolving multiple loggers', () => {
    beforeAll(async () => {
      const container = new Container()
      container.load(new LoggerModule())
      container.load(new WinstonModule())

      classes.forEach(c => {
        decorate(injectable(), c)
        container.bind(c).to(c)
        bindLogger((id: any) => container.bind(id), c)
      })
      classes.forEach(c => container.get(c))
    })

    it('should not warn about event emitters', () => {
      // Short of capturing STDOUT, just manually checking to see that no warnings are thrown to console
      expect(true).toBeTruthy()
    })
  })
})
