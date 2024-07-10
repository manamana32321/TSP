import { ScrollArea } from "@/components/ui/scroll-area"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

export default function Dialog() {
  const content = useSelector((state: RootState) => state.dialog.content)

  return <ScrollArea className="h-full m-auto border p-4">
    {content}
  </ScrollArea >
}