import { configureStore } from '@reduxjs/toolkit'
import inputSlice from './components/Input/inputSlice'
import dialogSlice from './components/Dialog/dialogSlice'

export const store = configureStore({
  reducer: {
    input: inputSlice,
    dialog: dialogSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch