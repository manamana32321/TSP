import { configureStore } from '@reduxjs/toolkit'
import inputSlice from './ui/inputSlice'
import dialogSlice from './ui/dialogSlice'
import gameSlice from './gameSlice'
import popupSlice from './ui/popupSlice'

export const store = configureStore({
  reducer: {
    game: gameSlice,
    input: inputSlice,
    dialog: dialogSlice,
    popup: popupSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch