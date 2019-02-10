# @node-ts/logger-core

The core logger abstraction that should be referenced throughout any package or application that requires logging functionality.

By default a raw console-based logger is provided. However, switching out the logger implementation (eg with Winston, Morgan etc) can be done by loading the module of that adapter.

Currently only one logger adapter is provided:
- `@node-ts/logger-winston`

Creating a new log adapter is relatively simple; and we do welcome pull requests to this monorepo.

## Using the default console adapter

To use the default log adapter, reference the `LoggerModule` from your inversify container:

```typescript
// application-container.ts
import { Container } from 'inversify'
import { LoggerModule } from '@node-ts/logger-core'

export class ApplicationContainer extends Container {
  start (): void {
    this.load(new LoggerModule())
  }
}
```

Then in any class where you need to log, inject it as part of the constructor parameters:

```typescript
// my-service.ts
import { injectable, inject } from 'inversify'
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core'

@injectable()
export class MyService {

  constructor (
    @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger
  ) {
  }

  action (): void {
    this.logger.info('Logging is now enabled')
  }

}
```

## Using a different adapter

For a list of prebuilt adapters, please search for `@node-ts/logger-` on npmjs.

## Creating a new adapter

Creation of your own logger adapter is done by implementing the `Logger` interface (to do the actual logging), and also implementing the `LoggerFactory` interface (to customize how loggers are built).

For example, a `Logger` implementation for the default logger looks something like:

```typescript
// console-logger.ts
import { Logger } from './logger'
import { injectable } from 'inversify'

@injectable()
export class ConsoleLogger implements Logger {

  constructor (
    private readonly name: string, // The name of this instance of the logger
    private readonly jsConsole = console // Used for testing
  ) {
  }

  debug (message: string, data?: object): void {
    log(this.jsConsole.debug.bind(this), this.name, message, data)
  }

  // ...additional logger functions as defined in `Logger`
}

function log (
  consoleLog: (message: string, ...optionalParams: any[]) => void,
  name: string,
  message: string,
  data?: object
): void {
  const namedMessage = `${name}: ${message}`
  if (data) {
    consoleLog(namedMessage, data)
  } else {
    consoleLog(namedMessage)
  }
}

```

Building a logger of this instance is managed by the `ConsoleLoggerFactory` that implements the `LoggerFactory` as such:

```typescript
import { injectable, interfaces } from 'inversify'
import { LoggerFactory } from './logger-factory'
import { ConsoleLogger } from './console-logger'
import { Logger } from './logger'

@injectable()
export class ConsoleLoggerFactory implements LoggerFactory {
  build (name: string, _: interfaces.Container): Logger {
    // The container can be used to get and inject any other dependencies used by the logger implementation
    return new ConsoleLogger(name)
  }
}
```

Finally these two classes need to be exposed via your module. This is done by module rebinding, eg:

```typescript
// my-console-logger-module.ts
import { ContainerModule } from 'inversify'
import { LOGGER_SYMBOLS } from './logger-symbols'
import { ConsoleLoggerFactory } from './console-logger-factory'

export class MyConsoleLoggerModule extends ContainerModule {
  constructor () {
    super((_, __, ___, rebind) => {
      rebind(LOGGER_SYMBOLS.LoggerFactory).to(ConsoleLoggerFactory)
    })
  }
}

```
