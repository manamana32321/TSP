import BaseEntity from "../base";
import { Inventoriable, Inventory } from "../item";
import Position, { Placable } from "../position";
import Level from "../position/level";

export default class Actor<L extends Level>
  extends BaseEntity
  implements Inventoriable<L>, Placable
{
  public inventory: Inventory<L> | null;
  public position: Position<L> | null;
  
  constructor(public name: string, inventory?: Inventory<L>, position?: Position<L>) {
    super(name)
    this.inventory = inventory ? inventory : null
    this.position = position ? position : null
  }

  toString() {
    return this.name
  }
}