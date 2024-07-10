import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InputType, InputOption } from '../../../types/input'

export interface InputState {
  type: InputType,
  options: InputOption[],
  currentUserInput: string | null,
  userInputHistory: string[],
  waitingForUserInput: boolean,
}

const initialState: InputState = {
  type: 'button',
  options: [],
  currentUserInput: null,
  userInputHistory: [],
  waitingForUserInput: false,
}

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInputType: (state, action: PayloadAction<InputType>) => {
      state.type = action.payload
    },
    setOptions: (state, action: PayloadAction<InputOption[]>) => {
      state.options = action.payload
    },
    clearOptions: (state) => {
      state.options = []
    },
    setUserInput: (state, action: PayloadAction<string>) => {
      state.currentUserInput = action.payload
      state.userInputHistory.push(action.payload)
      state.waitingForUserInput = false
    },
    setWaitForUserInput: (state, action: PayloadAction<boolean>) => {
      state.waitingForUserInput = action.payload
    },
  }
})

export const {
  setInputType, setOptions, clearOptions, setUserInput, setWaitForUserInput
} = inputSlice.actions

export default inputSlice.reducer