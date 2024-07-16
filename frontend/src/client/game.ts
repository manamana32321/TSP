import { Dispatch } from 'redux';
import { 
  setPlayerCharacter, addEntity, deleteEntity, 
  addActor, deleteActor, addLevel, deleteLevel, 
  addItem, deleteItem 
} from '@/app/gameSlice';
import Actor from "../../types/game/actor";
import GameError from "../../types/game/error";
import Position from "../../types/game/position";
import Level, { GridLevel } from "../../types/game/position/level";
import BaseEntity from '../../types/game/base';
import Item from '../../types/game/item';
import Movement from './movement';

/**
 * Proxy class for script writers' intellisense
 */
export default class Game<L extends Level> {
  private readonly dispatch: Dispatch;

  private _playerCharacter: Actor<L> | null = null
  private _entities: Set<BaseEntity>
  private _actors: Set<Actor<L>>
  private _levels: Set<L>
  private _items: Set<Item>

  public classes = {
    level: { Position, Level, GridLevel },
    entity: { BaseEntity, Actor, Item }
  }
  public errors = {
    level: { GameError }
  }
  
  public movement: Movement<L>

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch
    this._entities = new Set<BaseEntity>()
    this._actors = new Set<Actor<L>>()
    this._levels = new Set<L>()
    this._items = new Set<Item>()
    this.movement = new Movement<L>(this.dispatch)
  }

  get playerCharacter() { 
    return this._playerCharacter
  }

  set playerCharacter(pc: Actor<L> | null) {
    this._playerCharacter = pc
    this.dispatch(setPlayerCharacter(pc))
  }

  // BaseEntity
  get entities() {
    return this._entities
  }
  addEntity(entity: BaseEntity) {
    this._entities.add(entity)
    this.dispatch(addEntity(entity))
  }
  deleteEntity(entity: BaseEntity) {
    this._entities.delete(entity)
    this.dispatch(deleteEntity(entity))
  }

  // Actor
  get actors() {
    return this._actors
  }
  addActor(actor: Actor<L>) {
    this._actors.add(actor)
    this.dispatch(addActor(actor))
    this.addEntity(actor)
  }
  deleteActor(actor: Actor<L>) {
    this._actors.delete(actor)
    this.dispatch(deleteActor(actor))
    this.deleteEntity(actor)
  }

  // Level
  get levels() {
    return this._levels
  }
  addLevel(level: L) {
    this._levels.add(level)
    this.dispatch(addLevel(level))
    this.addEntity(level)
  }
  deleteLevel(level: L) {
    this._levels.delete(level)
    new Set<L>(Array.from(this._levels))
    this.dispatch(deleteLevel(level))
    this.deleteEntity(level)
  }

  // Item
  get items() {
    return this._items
  }
  addItem(item: Item) {
    this._items.add(item)
    this.dispatch(addItem(item))
    this.addEntity(item)
  }
  deleteItem(item: Item) {
    this._items.delete(item)
    this.dispatch(deleteItem(item))
    this.deleteEntity(item)
  }
}