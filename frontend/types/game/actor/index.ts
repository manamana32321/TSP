import BaseEntity from "../base";
import { Inventoriable, Inventory } from "../item";
import Position, { Placable } from "../position";

export default class Actor
  extends BaseEntity
  implements Inventoriable, Placable
{
  public inventory: Inventory | null;
  public position: Position | null;
  
  constructor(public name: string, inventory?: Inventory, position?: Position) {
    super(name)
    this.inventory = inventory ? inventory : null
    this.position = position ? position : null
  }
}