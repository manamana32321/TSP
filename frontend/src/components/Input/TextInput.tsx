import Link from "next/link";
import { Input, Option } from "../../../types/input";
import React from "react";

interface TextSelectorProps {
  option: Option;
}

function TextSelector({ option }: TextSelectorProps) {
  return <Link href="#">
    [{option.selectId}]{option.name}
  </Link>
}

interface TextInputProps {
  input: Input;
}

export default function TextInput({ input }: TextInputProps) {
  return <>
    {input.options.map((option, index) => {
      return (
        <React.Fragment key={index}>
          <TextSelector key={index} option={option} />
          &nbsp;&nbsp;&nbsp;&nbsp;
        </React.Fragment>
      )
    })}
  </>
}