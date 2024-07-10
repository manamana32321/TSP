import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export type ContentType = string | React.ReactNode

export interface DialogState {
  content: ContentType
}

const initialState: DialogState = {
  content: ''
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload
    }
  }
})

export const { setContent } = dialogSlice.actions

export default dialogSlice.reducer