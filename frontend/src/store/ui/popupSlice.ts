import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PopupState {
  popupIds: string[]
}

const initialState: PopupState = {
  popupIds: []
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    addPopupId: (state, action: PayloadAction<string>) => {
      const newPopupIds = state.popupIds.slice()
      if (newPopupIds.includes(action.payload)) {
        throw new Error('Integrity of state.popupIds corrupted. Client must prevent adding popup with duplicated id')
      }
      newPopupIds.push(action.payload)
      state.popupIds = newPopupIds
    },
    removePopupId: (state, action: PayloadAction<string>) => {
      const filteredPopupIds = state.popupIds.filter(id => id !== action.payload)
      if (filteredPopupIds.length === state.popupIds.length) {
        throw new Error('Integrity of state.popupIds corrupted. Client must prevent removing popup with invalid id')
      }
      state.popupIds = filteredPopupIds
    },
    clearPopupIds: (state) => {
      state.popupIds = []
    },
    moveAnIdToLast: (state, action: PayloadAction<string>) => {
      const focusedPopupIndex = state.popupIds.slice().findIndex(
        (popupId) => popupId === action.payload
      );
      const newPopupIds = state.popupIds.slice()
      if (focusedPopupIndex !== -1) {
        const [focusedPopup] = newPopupIds.splice(focusedPopupIndex, 1);
        newPopupIds.push(focusedPopup);
        state.popupIds = newPopupIds
      }
    },
  }
})

export const { addPopupId, removePopupId, clearPopupIds, moveAnIdToLast } = popupSlice.actions

export default popupSlice.reducer