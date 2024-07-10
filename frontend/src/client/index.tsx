import { store } from '@/store';
import { InputOption } from '../../types/input';
import { ContentType } from '@/components/Dialog/dialogSlice';
import { useDispatch } from 'react-redux';
import { setInputType, setOptions, clearOptions } from '@/components/Input/inputSlice';
import { setContent } from '@/components/Dialog/dialogSlice';

export default class Client {
  private static instance: Client;
  private readonly store: typeof store;
  public readonly dispatch;
  public readonly ui: {
    setInputType: typeof setInputType
  };

  private constructor( s: typeof store, d: ReturnType<typeof useDispatch> ) {
    this.store = s
    this.dispatch = d;
    this.ui = {
      setInputType
    }
  }

  static getInstance( s: typeof store, d: ReturnType<typeof useDispatch> ) {
    if (!Client.instance) Client.instance = new Client(s, d)
    return Client.instance
  }

  runScript(script: Function) {
    script(this)
  }

  log(message: string) {
    console.log(message)
  }

  print(content: ContentType) {
    this.dispatch(setContent(content))
  }

  async dialog(content: ContentType, options: InputOption[]) {
    this.print(content)
    this.dispatch(setOptions(options))
  }
}