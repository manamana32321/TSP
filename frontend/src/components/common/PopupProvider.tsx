import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Client from "@/client";
import InventoryUI, { INVENTORY_POPUP_PREFIX } from "../shared/Inventory";
import { createPopupOption } from "./Popup";

export const POPUP_BOUND_CLASS_NAME = "popup-bound"

export interface PopupProviderProp {
  children: React.ReactNode
}

/**
 * Detects change of redux state.popup.popupIds
 * and set the Map<popupId, popupElement> of Client
 * and render list of popup element
 * according to popupElement of Client
 */
export default function PopupManager({ children }: PopupProviderProp) {
  const client = Client.getInstance()
  const popupIds = useSelector((state: RootState) => state.popup.popupIds)
  const [popupElements, setPopupElements] = useState<React.ReactNode[]>([])

  // On chagne of redux popupIds -> render popupElements
  useEffect(() => {
    setPopupElements(client.ui.popup.popupElements)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupIds])

  return (
    <div className={POPUP_BOUND_CLASS_NAME}>
      {children}
      {popupElements}
    </div>
  )
};

export const handleKeyPress = (key: string, client: Client) => {
  switch (key) {
    case "Escape":
      client.ui.popup.removeFocusedPopup()
      break;
    case "i":
      client.game.togglePlayerCharacterInventory()
      break;
  }
}