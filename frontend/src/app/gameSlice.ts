import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BaseEntity from '../../types/game/base';
import Actor from '../../types/game/actor';
import Level from '../../types/game/position/level';
import Item from '../../types/game/item';
import Position from '../../types/game/position';

interface GameState {
  playerCharacter: Actor<any> | null;
  entities: Set<BaseEntity>;
  actors: Set<Actor<any>>;
  levels: Set<Level>;
  items: Set<Item>;
}

const initialState: GameState = {
  playerCharacter: null,
  entities: new Set<BaseEntity>,
  actors: new Set<Actor<any>>,
  levels: new Set<Level>,
  items: new Set<Item>,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerCharacter(state, action: PayloadAction<Actor<any> | null>) {
      state.playerCharacter = action.payload;
      if (action.payload) {
        state.actors.add(action.payload)
      }
    },

    addEntity(state, action: PayloadAction<BaseEntity>) {
      state.entities = new Set<BaseEntity>([...state.entities, action.payload])
    },
    deleteEntity(state, action: PayloadAction<BaseEntity>) {
      state.entities = new Set<BaseEntity>([...state.entities].filter(e => e !== action.payload))
    },

    addActor(state, action: PayloadAction<Actor<any>>) {
      state.actors.add(action.payload);
      state.entities.add(action.payload);
    },
    deleteActor(state, action: PayloadAction<Actor<any>>) {
      state.actors = state.actors.add(action.payload);
      state.entities = state.entities.add(action.payload);
    },
    setActorPosition(state, action: PayloadAction<[Actor<any>, Position<any>]>) {
      const [actor, position] = action.payload
      const foundActor = Array.from(state.actors).find(element => element === actor);
      if (foundActor) {
        foundActor.position = position
        state.actors = new Set<Actor<any>>([...state.actors] as Actor<any>[])
      }
    },

    addLevel(state, action: PayloadAction<Level>) {
      state.levels.add(action.payload);
      state.entities.add(action.payload);
    },
    deleteLevel(state, action: PayloadAction<Level>) {
      state.levels = state.levels.add(action.payload);
      state.entities = state.entities.add(action.payload);
    },
    addItem(state, action: PayloadAction<Item>) {
      state.items.add(action.payload);
      state.entities.add(action.payload);
    },
    deleteItem(state, action: PayloadAction<Item>) {
      state.items = state.items.add(action.payload);
      state.entities = state.entities.add(action.payload);
    }
  }
});

export const {
  setPlayerCharacter,
  addEntity,
  deleteEntity,
  addActor,
  deleteActor,
  setActorPosition,
  addLevel,
  deleteLevel,
  addItem,
  deleteItem
} = gameSlice.actions;

export default gameSlice.reducer;
