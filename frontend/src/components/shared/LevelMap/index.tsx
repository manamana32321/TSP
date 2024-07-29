import { LevelTile, LevelTileProp } from "@/components/SidebarLeft/GridLevelMiniMap"

export interface GridLevelMapProp {
  grid: LevelTileProp[][]
  cols: number
  rows: number
  gap: number
  zIndex: number
}

export default function GridLevelMap({ grid, cols, rows, gap, zIndex }: GridLevelMapProp) {
  const gridClassName = `grid`;
  const gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
  const gridTemplateRows = `repeat(${rows}, minmax(0, 1fr))`;

  return <div
    className={gridClassName}
    style={{
      gridTemplateColumns,
      gridTemplateRows,
      gap,
      zIndex,
    }}
  >{grid
    .slice()
    .reverse()
    .flat()
    .map((tile, index) => <LevelTile key={index} {...tile} />)}
  </div>
}