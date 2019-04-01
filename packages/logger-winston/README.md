# @node-ts/logger-winston

A Winston implementation for logger. 

## Usage

Install the package and its dependenceis

```
npm i @node-ts/logger-winston @node-ts/logger-core
```

Load the modules during application startup in inversify:

```typescript
import { Container } from 'inversify'
import { LoggerModule } from '@node-ts/logger-core'
import { WinstonModule } from '@node-ts/logger-winston'

// ...

const container = new Container()
container.load(new LoggerModule())
container.load(new WinstonModule())
```

## Custom Configuration

To configure the winston logger instances, provide your own `WinstonConfiguration` implementation, ie:

```typescript

@injectable()
export class CustomWinstonConfiguration implements WinstonConfiguration {
  getConfiguration (loggerName: string): winston.LoggerOptions {
    return {
      defaultMeta: { loggerName }
      // etc
    }
  }
}
```

Then to use it, rebind the `WINSTON_SYMBOLS.WinstonConfiguration` symbol on your application startup:

```typescript
import { ContainerModule } from 'inversify'
import { CustomWinstonConfiguration } from './custom-winston-configuration'
import { WINSTON_SYMBOLS } from '@node-ts/logger-winston'

export class ApplicationModule extends ContainerModule {
  constructor () {
    super((_, __, ___, rebind) => {
      rebind(WINSTON_SYMBOLS.WinstonConfiguration).to(CustomWinstonConfiguration)
    })
  }
}

```