import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Actor from "../../types/game/actor";
import Level from "../../types/game/position/level";
import { InvalidCurrentActorError } from "../../types/game/actor/error";

export interface gameState {
  current: {
    player: Actor | null,
  }
}

const initialState: gameState = {
  current: {
    player: null
  }
}

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    setPlayerCharacter: (state, action: PayloadAction<Actor | null>) => {
      state.current.player = action.payload
    },
    setCurrentLevel: (state, action: PayloadAction<Level>) => {
      if (!state.current.player) throw new InvalidCurrentActorError()
      let playerPosition = state.current.player.position
      if (playerPosition) {
        playerPosition.level = action.payload
        playerPosition.x = playerPosition.level.startingTileX
        playerPosition.y = playerPosition.level.startingTileY
      }
    },
  }
})

export const { setPlayerCharacter, setCurrentLevel } = gameSlice.actions

export default gameSlice.reducer