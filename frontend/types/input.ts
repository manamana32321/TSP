export type InputType = "text" | "button"

export interface Input {
  type: InputType
  options?: InputOption[]
}

export interface InputOption {
  id: number;
  selectId: number;
  name: string;
  disabled?: boolean;
}