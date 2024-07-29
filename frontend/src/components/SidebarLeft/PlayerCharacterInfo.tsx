import Image from "next/image"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

export default function PlayerCharacterInfo() {
  const pc = useSelector((state: RootState) => state.game.playerCharacter)
  
  return <>
    <Image
      alt="player character"
      src="/user-solid.svg"
      width={200}
      height={200}
      style={{ width: 'auto', height: 'auto' }}
      priority
    />
    <p className="bg-primary rounded-lg py-1 px-2 text-white mt-2">Name: {pc?.name}</p>
  </>
}