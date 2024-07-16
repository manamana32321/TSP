import BaseEntity from "../base";
import Level from "./level";

export default class Position<L extends Level> {
  public entities: BaseEntity[];

  constructor(
    public level: L,
    public readonly x: number, public readonly y: number
  ) {
    this.entities = []
  }

  addEntity(e: BaseEntity): void {
    this.entities.push(e)
  }

  removeEntity(e: BaseEntity) {
    this.entities = this.entities.filter(entity => entity !== e);
  }

  toString() {
    return `${this.level}(${this.x}, ${this.y})`
  }
}

export interface Placable<L extends Level = Level> {
  position: Position<L> | null
}