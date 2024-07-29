import Actor from "../../../../types/game/actor";
import Item from "../../../../types/game/item";
import { Button } from "../../ui/button";

export const INVENTORY_POPUP_PREFIX = "__INVENTORY"
export function createInventoryUI(props: InventoryUIProp) {
  return <InventoryUI {...props} />
}

interface ItemButtonProp {
  item: Item<any>
}

function ItemButton({ item }: ItemButtonProp) {
  return <Button>
    {item.name}
  </Button>
}

export interface InventoryUIProp {
  owner: Actor<any>;
  width?: number;
  height?: number;
  backgroundColor?: string;
  position?: React.CSSProperties['position'];
  top?: string;
  left?: string;
}


export default function InventoryUI({ owner, width, height, backgroundColor, position, top, left }: InventoryUIProp) {
  width = width ?? 600
  height = height ?? 400
  position = position ?? 'relative'

  return (
    <>
      {owner?.inventory?.list().map((item, index) => <ItemButton key={index} item={item} />)}
    </>
  )
}