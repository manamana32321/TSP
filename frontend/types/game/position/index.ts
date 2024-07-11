import BaseEntity from "../base";
import Level from "./level";

export default class Position {
  public entities: BaseEntity[];

  constructor(
    public level: Level,
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
}

export interface Placable {
  position: Position | null
}