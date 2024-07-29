import Item from ".";
import Actor from "../actor";
import Position from "../position";
import Level from "../position/level";

export type InnerSlot = "upper inner" | "under inner"
export type SingleSlot = "head" | "face" | "nose" | "mouth" | "neck" | "torso"
export type SymmetricMergedSlot = "eyes" | "ears" | "arms" | "wrists" | "hands" | "legs" | "socks" | "feet"
export type SymmetricSeperatedSlot = "left hand" | "right hand" | "left eye" | "right eye"
export type EquipmentSlot = InnerSlot | SingleSlot | SymmetricMergedSlot | SymmetricSeperatedSlot

export interface Equipable<L extends Level> {
  equipmentSlots: EquipmentSlot[]
  equipments: Equipment<L>[]

  equip(equipment: Equipment<L>): void
  unequip(equipment: Equipment<L>): Equipment<L>
}

export default class Equipment<L extends Level> extends Item<L> {
  public owner: Actor<L> | null

  constructor(public name: string, position?: Position<L>, owner?: Actor<L>) {
    super(name, position)
    if (owner) {
      this.owner = owner
      owner.equip(this)
    }
    this.owner = null
  }
}