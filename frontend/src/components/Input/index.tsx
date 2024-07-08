'use client'
import { Input, Option } from "../../../types/input";
import useInputStore from "../../../stores/inputStore";
import TextInput from "./TextInput";
import ButtonInput from "./ButtonInput";
import React from "react";

function getDummyInput(): Input {
  const options: Option[] = [
    {id: 1, selectId: 101, name: 'Greet', disabled: false},
    {id: 2, selectId: 102, name: 'Ignore', disabled: true},
    {id: 3, selectId: 201, name: 'Communicate', disabled: false},
  ]
  return {inputType: 'button', options}
}

export default function InputElement() {
  const inputStore = useInputStore();
  inputStore.setInputType('button')
  const InputElement = inputStore.inputType === 'text' ? TextInput : ButtonInput
  const dummyInput = getDummyInput()
  
  return <div className='p-1 border h-full'>
    <InputElement input={dummyInput} maxButtonCount={25} />
  </div>
}