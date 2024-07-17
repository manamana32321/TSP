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
}

export class Inventory<L extends Level> {
  private list: Item<L>[]
  constructor() {
    this.list = []
  }

  add(e: Item<L>) {
    this.list.push(e)
  }

  remove(entity: Item<L>) {
    this.list = this.list.filter(element => element !== entity)
  }
}