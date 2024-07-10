import { Input } from "../../../types/input";
import Button from "./Button";
import { ScrollArea } from "@/components/ui/scroll-area"

interface ButtonInputProps {
  input: Input;
  maxButtonCount: number;
  onInput: Function;
}

export default function ButtonInput({ input, maxButtonCount, onInput }: ButtonInputProps) {
  const buttonCountDiff = maxButtonCount - (input.options ? input.options.length : 0);
  const blankButtons = [];

  const handleOnClick = (optionId: string) => {
    onInput(optionId)
  }

  for (let i = 0; i < buttonCountDiff; i++) {
    blankButtons.push(i);
  }

  return (
    <ScrollArea>
      <div className="grid grid-cols-5 grid-rows-4 gap-1">
        {input.options.map((option, index) => (
          <Button
            key={index}
            onClick={e => handleOnClick(option.selectId)}>
              {option.name}
          </Button>
        ))}
        {blankButtons.map((index) => (
          <Button key={index} disabled={true}></Button>
        ))}
      </div>
    </ScrollArea>
  );
}
