export type InputType = "text" | "button"

export interface Input {
  type: InputType
  options: InputOption[]
}

export interface InputOption {
  selectId: string;
  name: string;
  description?: string;
  disabled?: boolean;
}