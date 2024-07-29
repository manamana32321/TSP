export interface Debugable {
  readonly _debugger: CustomDebugger
}

export default class CustomDebugger {
  public static instance: CustomDebugger
  public isDebugging: boolean = false
  private static logger: typeof console

  private constructor() {
    CustomDebugger.logger = console
  }

  static getInstance() {
    if (CustomDebugger.instance) {
      return CustomDebugger.instance
    }
    CustomDebugger.instance = new CustomDebugger()
    return CustomDebugger.instance
  }

  log(message: any) {
    if (!this.isDebugging) return
    CustomDebugger.logger.log(message)
  }

  warn(message: any) {
    if (!this.isDebugging) return
    CustomDebugger.logger.warn(message)
  }

  error(message: any) {
    if (!this.isDebugging) return
    CustomDebugger.logger.error(message)
  }
}