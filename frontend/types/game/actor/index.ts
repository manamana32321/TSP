import BaseEntity from "../base";
import { Inventoriable, Inventory } from "../item";
import Position, { Placable } from "../position";
import { InvalidPositionError } from "../position/error";
import Level from "../position/level";

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

  public isAccessablePosition(position: Position) {
    return true
  }

  public place(position: Position): Position {
    if (this.isAccessablePosition(position)) {
      this.position = position;
      return position;
    }
    throw new InvalidPositionError(`Invalid position: '${position}'`);
  }
}