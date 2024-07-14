import { configureStore } from '@reduxjs/toolkit'
import inputSlice from './components/Input/inputSlice'
import dialogSlice from './components/Dialog/dialogSlice'
import gameSlice from './app/gameSlice'

export const store = configureStore({
  reducer: {
    game: gameSlice,
    input: inputSlice,
    dialog: dialogSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch