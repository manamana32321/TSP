import { NotImplementedError } from "../../error";
import BaseEntity from "../base";
import Item, { Inventoriable, Inventory } from "../item";
import Equipment, { Equipable, EquipmentSlot } from "../item/equipment";
import { ImproperlyConfiguredError } from "../item/errors";
import Position, { Placable } from "../position";
import Level from "../position/level";

export default class Actor<L extends Level>
  extends BaseEntity
  implements Inventoriable<L>, Placable<L>, Equipable<L>
{
  public inventory: Inventory<L> | null;
  public position: Position<L> | null;
  public equipmentSlots: EquipmentSlot[]
  public equipments: Equipment<L>[]
  
  constructor(
    public name: string,
    inventory?: Inventory<L>,
    position?: Position<L>,
    equipmentSlots?: EquipmentSlot[],
    equipments?: Equipment<L>[],
  ) {
    super(name)
    this.inventory = inventory ? inventory : null
    this.position = position ? position : null
    if (equipments && !equipmentSlots) {
      throw new ImproperlyConfiguredError('Equipments are given without Equipment Slots')
    }
    this.equipmentSlots = equipmentSlots ?? []
    this.equipments = equipments ?? []
  }

  equip(equipment: Equipment<L>): void {
    throw new NotImplementedError
  }

  unequip(equipment: Equipment<L>): Equipment<L> {
    throw new NotImplementedError
  }

  addItem(item: Item<L>): void {
    throw new NotImplementedError
  }

  popItem(item: Item<L>): Item<L> {
    throw new NotImplementedError
  }
  
  toString() {
    return this.name
  }
}