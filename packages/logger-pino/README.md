# @node-ts/logger-pino

A Pino implementation for logger. 

## Usage

Install the package and its dependenceis

```
npm i @node-ts/logger-pino @node-ts/logger-core
```

Load the modules during application startup in inversify:

```typescript
import { Container } from 'inversify'
import { LoggerModule } from '@node-ts/logger-core'
import { PinoModule } from '@node-ts/logger-pino'

// ...

const container = new Container()
container.load(new LoggerModule())
container.load(new PinoModule())
```

## Custom Configuration

To configure the pino logger instances, provide your own `PinoConfiguration` implementation, ie:

```typescript

@injectable()
export class CustomPinoConfiguration implements PinoConfiguration {
  getConfiguration (loggerName: string): pino.LoggerOptions {
    return {
      enabled: true,
      level: 'info',
      prettyPrint: false,
      serializers: noir
      ....
    }
  }
}
```

Then to use it, rebind the `PINO_SYMBOLS.PinoConfiguration` symbol on your application startup:

```typescript
import { ContainerModule } from 'inversify'
import { CustomWinstonConfiguration } from './custom-winston-configuration'
import { PINO_SYMBOLS } from '@node-ts/logger-pino'

export class ApplicationModule extends ContainerModule {
  constructor () {
    super((_, __, ___, rebind) => {
      rebind(PINO_SYMBOLS.PinoConfiguration).to(CustomPinoConfiguration)
    })
  }
}

```