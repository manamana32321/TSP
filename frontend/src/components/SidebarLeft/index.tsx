import GridLevelMap from "./GridLevelMap"
import PlayerCharacterInfo from "./PlayerCharacterInfo"

export default function SidebarLeft() {
  return <div className="p-2 h-full flex flex-col">
    <PlayerCharacterInfo />
    <div className="h-full"></div>
    <GridLevelMap />
  </div>
}