import BaseEntity from "../base";
import Level from "./level";

export default class Tile extends BaseEntity {
  public entities: BaseEntity[];
  public readonly level: Level

  constructor(level: Level, name?: string)
  {
    super(name ?? '')
    this.level = level
    this.entities = []
  }

  addEntity(e: BaseEntity): void {
    this.entities.push(e)
  }

  removeEntity(e: BaseEntity) {
    this.entities = this.entities.filter(entity => entity !== e);
  }
}