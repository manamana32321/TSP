import { Dispatch } from 'redux';
import { 
  setPlayerCharacter, addEntity, deleteEntity, 
} from '@/store/gameSlice';
import Actor from "../../types/game/actor";
import GameError from "../../types/game/error";
import Position from "../../types/game/position";
import Level, { GridLevel } from "../../types/game/position/level";
import BaseEntity from '../../types/game/base';
import Item, { Inventory } from '../../types/game/item';
import Movement from './movement';
import CustomDebugger, { Debugable } from '@/utils/debugger';
import { UiSet } from '.';
import { createInventoryUI, INVENTORY_POPUP_PREFIX } from '@/components/shared/Inventory';
import { createPopupOption } from '@/components/common/Popup';

/**
 * Proxy class for script writers' intellisense
 */
export default class Game<L extends Level> implements Debugable {
  private readonly dispatch: Dispatch;

  private _playerCharacter: Actor<L> | null = null
  private _entities: Set<BaseEntity>
  private _actors: Set<Actor<L>>
  private _levels: Set<L>
  private _items: Set<Item<L>>

  public classes = {
    level: { Position, Level, GridLevel },
    entity: { BaseEntity, Actor, Item }
  }
  public errors = {
    level: { GameError }
  }
  
  public movement: Movement<L>

  constructor(dispatch: Dispatch, public readonly ui: UiSet, readonly _debugger: CustomDebugger) {
    this.dispatch = dispatch
    this._entities = new Set<BaseEntity>()
    this._actors = new Set<Actor<L>>()
    this._levels = new Set<L>()
    this._items = new Set<Item<L>>()
    this.movement = new Movement<L>(this.dispatch, this._debugger)
  }

  get playerCharacter() { 
    return this._playerCharacter
  }

  set playerCharacter(pc: Actor<L> | null) {
    this._playerCharacter = pc
    if (this._playerCharacter && !this._playerCharacter.inventory) {
      this._playerCharacter.inventory = new Inventory()
    }
    this.dispatch(setPlayerCharacter(pc))
  }

  togglePlayerCharacterInventory() {
    if (!this._playerCharacter) {
      this._debugger.error(
        `Failed to open inventory. Player Character is invalid: '${this._playerCharacter}'`)
      return
    }
    const popupIdPrefix = INVENTORY_POPUP_PREFIX
    const popupChildren = createInventoryUI({ owner: this._playerCharacter })
    const popupOption: createPopupOption = {
      title: `Inventory of '${this._playerCharacter}'`
    }
    this.ui.popup.togglePopup(popupIdPrefix, popupChildren, popupOption)
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
    this.dispatch(addEntity(actor))
    this.addEntity(actor)
  }
  deleteActor(actor: Actor<L>) {
    this._actors.delete(actor)
    this.dispatch(deleteEntity(actor))
    this.deleteEntity(actor)
  }

  // Level
  get levels() {
    return this._levels
  }
  addLevel(level: L) {
    this._levels.add(level)
    this.dispatch(addEntity(level))
    this.addEntity(level)
  }
  deleteLevel(level: L) {
    this._levels.delete(level)
    new Set<L>(Array.from(this._levels))
    this.dispatch(deleteEntity(level))
    this.deleteEntity(level)
  }

  // Item
  get items() {
    return this._items
  }
  addItem(item: Item<L>) {
    this._items.add(item)
    this.dispatch(addEntity(item))
    this.addEntity(item)
  }
  deleteItem(item: Item<L>) {
    this._items.delete(item)
    this.dispatch(deleteEntity(item))
    this.deleteEntity(item)
  }
}
