import Image from "next/image"

export default function SidebarLeft() {
  return <div className="p-2 h-full">
    <Image
      alt="player character"
      src="/user-solid.svg"
      width={200}
      height={200}
      priority
    />
  </div>
}