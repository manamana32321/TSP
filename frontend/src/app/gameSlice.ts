import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BaseEntity from '../../types/game/base';
import Actor from '../../types/game/actor';
import Level from '../../types/game/position/level';
import Item from '../../types/game/item';
import Position from '../../types/game/position';
import { InvalidTypeError } from '../../types/game/error';

interface GameState {
  playerCharacter: Actor<any> | null;
  entities: Set<BaseEntity>;
  actors: Set<Actor<any>>;
  levels: Set<Level>;
  items: Set<Item<any>>;
}

const initialState: GameState = {
  playerCharacter: null,
  entities: new Set<BaseEntity>,
  actors: new Set<Actor<any>>,
  levels: new Set<Level>,
  items: new Set<Item<any>>,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerCharacter(state, action: PayloadAction<Actor<any> | null>) {
      state.playerCharacter = action.payload
      if (action.payload) {
        state.actors = new Set(state.actors.add(action.payload))
      }
    },

    // BaseEntity
    addEntity(state, action: PayloadAction<BaseEntity>) {
      const entity = action.payload;
      const entityType = action.payload.constructor.name;
      state.entities = new Set([...state.entities, entity]);
      switch (entityType) {
        case 'Actor':
          state.actors = new Set([...state.actors, entity as Actor<any>]);
          break;
        case 'Item':
          state.items = new Set([...state.items, entity as Item<any>]);
          break;
        case 'Level':
          state.levels = new Set([...state.levels, entity as Level]);
          break;
        default:
          throw new InvalidTypeError(`Invalid type '${entityType}'`);
      }
    },
    deleteEntity(state, action: PayloadAction<BaseEntity>) {
      const entityType = action.payload.constructor.name;
      state.entities = new Set([...state.entities].filter(e => e !== action.payload))
      switch (entityType) {
        case 'Actor':
          state.actors = new Set([...state.actors].filter(e => e.id !== action.payload.id));
          break;
        case 'Item':
          state.items = new Set([...state.items].filter(e => e.id !== action.payload.id));
          break;
        case 'Level':
          state.levels = new Set([...state.levels].filter(e => e.id !== action.payload.id));
          break;
        default:
          throw new InvalidTypeError(`Invalid type '${entityType}'`);
      }
    },

    // Position
    setEntityPosition(state, action: PayloadAction<[BaseEntity, Position<any>]>) {
      const [entity, position] = action.payload
      const entityType = entity.constructor.name
      let foundEntity
      switch (entityType) {
        case 'Actor':
          foundEntity = Array.from(state.actors).find(element => element.id === entity.id)
          if (foundEntity) {
            foundEntity.position = position
            state.actors = new Set(state.actors)
          }
          break
        case 'Item':
          foundEntity = Array.from(state.items).find(element => element.id === entity.id)
          if (foundEntity) {
            foundEntity.position = position
            state.items = new Set(state.items)
          }
          break
        default:
          throw new InvalidTypeError(`Not positionable type '${entityType}'`)
      }
    },
  }
});

export const {
  setPlayerCharacter,
  addEntity,
  deleteEntity,
  setEntityPosition,
} = gameSlice.actions;

export default gameSlice.reducer;
