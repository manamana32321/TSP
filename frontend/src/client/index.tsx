import { store, RootState } from '@/store';
import { InputOption } from '../../types/input';
import { setInputType, setOptions, setUserInput, setWaitForUserInput } from '@/components/Input/inputSlice';
import { setContent } from '@/components/Dialog/dialogSlice';

export default class Client {
  private static instance: Client;
  public readonly dispatch;
  public readonly selector;
  public readonly ui: {
    setInputType: typeof setInputType
  };
  private userInputResolver: ((value: string) => void) | null = null;

  private constructor() {
    this.dispatch = store.dispatch;
    this.selector = (selectorFn: (state: RootState) => any) => {
      return selectorFn(store.getState());
    };
    this.ui = {
      setInputType
    };
  }

  static getInstance() {
    if (!Client.instance) {
      Client.instance = new Client()
    }
    return Client.instance;
  }

  runScript(script: Function) {
    script(this)
  }

  log(message: string) {
    console.log(message)
  }

  print(content: string) {
    this.dispatch(setContent(content))
  }

  private setOptions(options: InputOption[]) {
    this.dispatch(setOptions(options));
  }

  async waitUntilUserInput(): Promise<string> {
    this.dispatch(setWaitForUserInput(true));
    return new Promise<string>((resolve) => {
      this.userInputResolver = resolve;
    });
  }

  handleUserInput(userInput: string) {
    this.dispatch(setUserInput(userInput));
    this.dispatch(setWaitForUserInput(false));
    if (this.userInputResolver) {
      this.userInputResolver(userInput);
      this.userInputResolver = null;
    }
  }

  async dialog(content: string, options: InputOption[]) {
    this.print(content);
    this.setOptions(options);
    return await this.waitUntilUserInput();
  }

  async dialogWithNext(content: string, optionName: string = "Next") {
    return this.dialog(content, [{ selectId: '1', name: optionName }]);
  }

  setUserInput(userInput: string) {
    this.dispatch(setUserInput(userInput));
  }

  async getUserInput(options?: InputOption[]) {
    if (options) this.setOptions(options);
    return await this.waitUntilUserInput();
  }
}