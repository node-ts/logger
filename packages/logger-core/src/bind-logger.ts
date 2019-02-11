import { Logger } from './logger'
import { interfaces } from 'inversify'
import { LOGGER_SYMBOLS } from './logger-symbols'
import { LoggerFactory } from './logger-factory'

// tslint:disable-next-line:no-any Actual node type definition
export type ClassConstructor<Type> = new (...args: any[]) => Type

/**
 * Dynamically creates a new logger based on the name of the type it's being injected into.
 * @param bind Inversify's `bind` function for the current module/container
 * @param type Type the logger is being bound to
 */
export function bindLogger<T> (bind: interfaces.Bind, type: ClassConstructor<T>): void {
  bind<Logger>(LOGGER_SYMBOLS.Logger)
    .toDynamicValue(context => {
      const factory = context.container.get<LoggerFactory>(LOGGER_SYMBOLS.LoggerFactory)
      return factory.build(type.name, context.container)
    })
    .whenInjectedInto(type)
}
