import BaseEntity from "../base";
import Position, { Placable } from "../position";
import Level from "../position/level";

export default class Item<L extends Level>
  extends BaseEntity
  implements Placable
{
  position: Position<L> | null

  constructor(public name: string, position?: Position<L>) {
    super(name)
    this.position = position ? position : null
  }
}

export interface Inventoriable<L extends Level> {
  inventory: Inventory<L> | null

  addItem(item: Item<L>): void
  popItem(item: Item<L>): Item<L>
}

export class Inventory<L extends Level> {
  private _list: Item<L>[]
  constructor() {
    this._list = []
  }

  add(e: Item<L>) {
    this._list.push(e)
  }

  remove(entity: Item<L>) {
    this._list = this._list.filter(element => element !== entity)
  }

  list() {
    return this._list
  }
}