import { Input } from "../../../types/input";
import Button from "./Button";
import { ScrollArea } from "@/components/ui/scroll-area"

interface ButtonInputProps {
  input: Input;
  maxButtonCount: number;
}

export default function ButtonInput({ input, maxButtonCount }: ButtonInputProps) {
  const buttonCountDiff = maxButtonCount - input.options ? input.options.length : 0;
  const blankButtons = [];

  for (let i = 0; i < buttonCountDiff; i++) {
    blankButtons.push(i);
  }

  return (
    <ScrollArea>
      <div className="grid grid-cols-5 grid-rows-4 gap-1">
        {input.options.map((option, index) => (
          <Button key={index}>{option.name}</Button>
        ))}
        {blankButtons.map((index) => (
          <Button key={index} disabled={true}></Button>
        ))}
      </div>
    </ScrollArea>
  );
}
