import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Client from "@/client";
import Draggable from 'react-draggable'
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export interface PopupProp {
  id: string;
  children: React.ReactNode;
  title: string;
  width?: number;
  height?: number;
}

export default function Popup({ id, children, width, height, title }: PopupProp) {
  const client = Client.getInstance()
  const popupIds = useSelector((state: RootState) => state.popup.popupIds)
  const [popupZIndex, setPopupZIndex] = useState<number>()
  useEffect(() => {
    const newZIndex = 900 + popupIds.findIndex(popupId => popupId === id)
    setPopupZIndex(newZIndex)
  }, [popupIds, id])
  
  width = width ?? 500
  height = height ?? 300

  return (
    <Draggable
      onStart={() => client.ui.popup.focusPopup(id)}
      defaultPosition={{ x: window.innerWidth/2 -(width/2) , y: -window.innerHeight/2 -(height/2) }}
      handle=".draggable-handle"
      bounds="body"
      >
      <div
        className="border rounded-lg p-2 bg-secondary shadow-2xl \"
        style={{
          zIndex: popupZIndex,
          width, height,
          position: 'absolute',
          }}>
        <div className="flex justify-content-between mb-2">
          <p className="rounded-lg p-1 bg-primary text-center text-white w-full me-2 draggable-handle">
            {title}
          </p>
          <Button onClick={() => {client.ui.popup.removePopup(id)}}>
            X
          </Button>
        </div>
      {children}
    </div>
  </Draggable>
  )
}

export type createPopupOption = Omit<PopupProp, 'id' | 'children'>
export const createPopup = (id: string, children: React.ReactNode, options: createPopupOption): React.ReactNode => {
  return <Popup key={id} id={id} {...options}>{children}</Popup>;
};

export function PopupTest() {
  const client = Client.getInstance()
  let counter = 0

  return (
    <div className="flex gap-2">
      <Button onClick={() => {
        counter += 1
        client.ui.popup.addPopup(String(counter), <p>Test Popup {counter}</p>, { title: `Test Popup ${counter}` })
      }}>Add</Button>
      <Button onClick={() => {
        client.ui.popup.removeFocusedPopup()
      }}>Remove Last</Button>
      <Button onClick={() => {
        client.ui.popup.clearPopups()
      }}>Clear</Button>
    </div>
  )
}