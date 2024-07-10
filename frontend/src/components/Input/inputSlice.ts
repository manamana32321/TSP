import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InputType, InputOption } from '../../../types/input'

export interface InputState {
  type: InputType,
  options: InputOption[],
}

const initialState: InputState = {
  type: 'button',
  options: [
    { id:1, selectId: 101, name: "Default Option1" },
  ]
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
  }
})

export const { setInputType, setOptions, clearOptions } = inputSlice.actions

export default inputSlice.reducer