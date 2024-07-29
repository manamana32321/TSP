import Client from "@/client";
import React, { useEffect } from "react";

export type keydownHandler = ((e: KeyboardEvent) => void)

export interface HotkeyProviderProp {
  children: React.ReactNode
  keydownHandlers: keydownHandler[]
}

// TODO: should add keybinding mapper in order to prevent duplicated key bindings
export default function HotkeyProvider({ children, keydownHandlers }: HotkeyProviderProp) {
  const client = Client.getInstance()
  const _debugger = client._debugger

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      _debugger.log(`HotkeyProvider got a keydown event`)
      _debugger.log(e)
      keydownHandlers.map((handler: keydownHandler) => handler(e))
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [keydownHandlers, _debugger]);

  return <div>{children}</div>;
}
