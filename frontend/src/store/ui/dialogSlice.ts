import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DialogState {
  content: string
}

const initialState: DialogState = {
  content: ''
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    }
  }
})

export const { setContent } = dialogSlice.actions

export default dialogSlice.reducer