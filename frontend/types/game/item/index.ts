import BaseEntity from "../base";

export default class Item extends BaseEntity {
  constructor(public name: string) {
    super(name)
  }
}

export interface Inventoriable {
  inventory: Inventory | null
}

export class Inventory {
  private list: Item[]
  constructor() {
    this.list = []
  }

  add(e: Item) {
    this.list.push(e)
  }

  remove(entity: Item) {
    this.list = this.list.filter(element => element !== entity)
  }
}