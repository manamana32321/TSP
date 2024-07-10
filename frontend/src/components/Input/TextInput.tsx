import { Input, InputOption } from "../../../types/input";
import React from "react";

interface TextInputProps {
  input: Input;
  onInput: (e: string) => void;
}

interface TextSelectorProps {
  option: InputOption;
  onInput: (e: string) => void;
}

function TextSelector({ option, onInput }: TextSelectorProps) {
  const handleOnClick = (optionId: string) => {
    onInput(optionId)
  }

  return <button onClick={e => handleOnClick(option.selectId)}>
    [{option.selectId}]{option.name}
  </button>
}

export default function TextInput({ input, onInput }: TextInputProps) {
  return <>
    {input.options.map((option, index) => {
      return (
        <React.Fragment key={index}>
          <TextSelector key={index} option={option} onInput={onInput} />
          &nbsp;&nbsp;&nbsp;&nbsp;
        </React.Fragment>
      )
    })}
  </>
}