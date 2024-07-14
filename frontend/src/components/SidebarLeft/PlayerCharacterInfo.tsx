import Image from "next/image"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

export default function PlayerCharacterInfo() {
  const pc = useSelector((state: RootState) => state.game.current.player)
  
  return <>
    <Image
      alt="player character"
      src="/user-solid.svg"
      width={200}
      height={200}
      priority
    />
    <p>Name: {pc?.name}</p>
  </>
}