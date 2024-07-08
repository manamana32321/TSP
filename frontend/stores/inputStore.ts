import { create } from 'zustand';

export type InputType = 'text' | 'button';

interface InputStoreType {
  inputType: InputType;
  setInputType: (newInputType: InputType) => void;
}

const useInputStore = create<InputStoreType>((set, get) => ({
  inputType: 'text',
  setInputType: (newInputType: InputType) => {
    if (get().inputType !== newInputType) {
      set({ inputType: newInputType });
    }
  },
}));

export default useInputStore;
