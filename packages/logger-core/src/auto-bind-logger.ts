import { interfaces } from 'inversify'
import { Logger } from './logger'
import { LOGGER_SYMBOLS } from './logger-symbols'
import { LoggerFactory } from './logger-factory'

/**
 * Automatically builds loggers based on the target class and injects. If using this style, remember:
 * - only call it once while creating the container
 * - do not bind any loggers manually, otherwise you'll get an `Ambiguous match found for serviceIdentifier` error
 */
export function autoBindLoggers (bind: interfaces.Bind): void {
  bind<Logger>(LOGGER_SYMBOLS.Logger)
    .toDynamicValue(context => {
      const targetClassName = (
        context.currentRequest.parentRequest
        && context.currentRequest.parentRequest.bindings.length
        && context.currentRequest.parentRequest.bindings[0].implementationType
        && (context.currentRequest.parentRequest.bindings[0].implementationType as { name: string }).name
      ) || 'Unresolvable'

      const loggerFactory = context.container.get<LoggerFactory>(LOGGER_SYMBOLS.LoggerFactory)
      return loggerFactory.build(targetClassName, context.container)
    })
    .inTransientScope()
}
