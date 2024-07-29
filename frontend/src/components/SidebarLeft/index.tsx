import GridLevelMiniMap from "./GridLevelMiniMap"
import PlayerCharacterInfo from "./PlayerCharacterInfo"

export default function SidebarLeft() {
  return <div className="p-2 h-full flex flex-col">
    <PlayerCharacterInfo />
    <div className="h-full bg-secondary"></div>
    <GridLevelMiniMap />
  </div>
}