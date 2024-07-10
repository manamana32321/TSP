import TextInput from "./TextInput";
import ButtonInput from "./ButtonInput";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Client from "@/client"

export default function InputElement() {
  const input = useSelector((state: RootState) => state.input);
  const InputElement = input.type === 'text' ? TextInput : ButtonInput;
  const client = Client.getInstance()

  const handleOnInput = (e: any) => {
    client.handleUserInput.bind(client)(e)
  }

  return (
    <div className='p-1 border h-full'>
      <InputElement
        input={input}
        maxButtonCount={25}
        onInput={handleOnInput}
      />
    </div>
  );
}
