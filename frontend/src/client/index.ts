import { store } from '@/store';
import { InputOption } from '../../types/input';
import { setOptions, setUserInput, setWaitForUserInput } from '@/store/ui/inputSlice';
import { setContent } from '@/store/ui/dialogSlice';
import Game from './game';
import PopupClient from './ui/popup';
import CustomDebugger, { Debugable } from '@/utils/debugger';

export type UiSet = { popup: PopupClient }

export default class Client implements Debugable {
  private static instance: Client;
  private readonly dispatch;
  readonly _debugger: CustomDebugger;
  private userInputResolver: ((value: string) => void) | null = null;
  public ui: UiSet
  public game;
  
  private constructor() {
    this.dispatch = store.dispatch;
    this._debugger = CustomDebugger.getInstance()
    this.ui = {
      popup: PopupClient.getInstance(this.dispatch, this._debugger)
    }
    this.game = new Game(this.dispatch, this.ui, this._debugger)
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

  setDebugState(state: boolean) {
    this._debugger.isDebugging = state
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

  /**
   * 팝업(모달) 관리 체계 설계
   * 최종 목적
   * -1. Client.addPopup을 통해 스크립트 작성자가 팝업을 띄울 수 있어야 한다
   * -2. 다른 컴포넌트(SidebarRight)에서 팝업을 띄울 수 있어야 한다 -> Client를 통해서 가능
   * -3. 팝업은 children: string | React.ReactNode 받고 렌더링 할 수 있어야 한다
   * 
   * 설계
   * -1. Client에서 
   */

  // closePopup(id: string) {
  //   if (popupElement) {
  //     this.dispatch(removePopupId(popupElement))
  //   }
  //   this.dispatch(removeLast())
  // }

  // clearPopups() {
  //   this.dispatch(removeAll())
  // }
}