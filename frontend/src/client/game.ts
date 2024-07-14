import Position from '../../types/game/position';
import Level, { GridLevel } from '../../types/game/position/level';
import { PositionError, InvalidPositionError } from '../../types/game/position/error';
import BaseEntity from '../../types/game/base';
import Item from '../../types/game/item';
import Actor from '../../types/game/actor';

import { setPlayerCharacter, setCurrentLevel } from '@/app/gameSlice';

export default class Game {
  private readonly dispatch;

  private _playerCharacter: Actor | null = null
  private _entities: Set<BaseEntity>
  private _actors: Set<Actor>
  private _levels: Set<Level>
  private _items: Set<Item>

  public classes = {
    level: { Position, Level, GridLevel },
    entity: { BaseEntity, Actor, Item }
  }
  public errors = {
    level: { PositionError, InvalidPositionError }
  }

  constructor(dispatch: any) {
    this.dispatch = dispatch
    this._entities = new Set<BaseEntity>
    this._actors = new Set<Actor>
    this._levels = new Set<Level>
    this._items = new Set<Item>
  }

  get playerCharacter() { 
    return this._playerCharacter
  }

  set playerCharacter(pc: Actor | null) {
    this._playerCharacter = pc
    this.dispatch(setPlayerCharacter(pc))
  }

  // BaseEntity
  get entities() {
    return this._entities
  }
  addEntity(entity: BaseEntity) {
    this._entities.add(entity)
  }
  deleteEntity(entity: BaseEntity) {
    this._entities.add(entity)
  }

  // Actor
  get actors() {
    return this._actors
  }
  addActor(actor: Actor) {
    this._actors.add(actor)
    this.addEntity(actor)
  }
  deleteActor(actor: Actor) {
    this._actors.delete(actor)
    this.deleteEntity(actor)
  }

  // Level
  get levels() {
    return this._levels
  }
  addLevel(level: Level) {
    this._levels.add(level)
    this.addEntity(level)
  }
  deleteLevel(level: Level) {
    this._levels.delete(level)
    this.addEntity(level)
  }

  // Item
  get items() {
    return this._items
  }
  addItem(item: Item) {
    this._items.add(item)
    this.addEntity(item)
  }
  deleteItem(item: Item) {
    this._items.delete(item)
    this.addEntity(item)
  }
}