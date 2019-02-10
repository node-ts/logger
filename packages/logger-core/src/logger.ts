export interface Logger {
  debug (message: string, meta?: object): void
  trace (message: string, meta?: object): void
  info (message: string, meta?: object): void
  warn (message: string, meta?: object): void
  error (message: string, meta?: object): void
  fatal (message: string, meta?: object): void
}
