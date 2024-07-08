import { InputType } from "../stores/inputStore";

export interface Input {
  inputType: InputType
  options: Option[]
}

export interface Option {
  id: number;
  selectId: number;
  name: string;
  disabled: boolean;
}