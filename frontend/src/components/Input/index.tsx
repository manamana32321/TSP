import TextInput from "./TextInput";
import ButtonInput from "./ButtonInput";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function InputElement() {
  const input = useSelector((state: RootState) => state.input)
  const InputElement = input.type === 'text' ? TextInput : ButtonInput
  
  return <div className='p-1 border h-full'>
    <InputElement input={input} maxButtonCount={25} />
  </div>
}