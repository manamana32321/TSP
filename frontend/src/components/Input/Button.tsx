import { Button as DifaultButton, ButtonProps } from "@/components/ui/button"

interface Props extends ButtonProps {
  disabled?: boolean;
}

export default function Button({ disabled = false, ...props }: Props) {
  return <DifaultButton disabled={disabled} {...props} />
}