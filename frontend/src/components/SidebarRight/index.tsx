import { Button } from "../ui/button";
import { GiHandBag } from "react-icons/gi";
import Client from "@/client";

export default function SidebarRight() {
  const client = Client.getInstance()

  const handleInventoryButtonClick = () => {
    client.game.togglePlayerCharacterInventory()
  }

  return <div className="p-2 h-full">
    <Button onClick={handleInventoryButtonClick}><GiHandBag /></Button>
  </div>
}