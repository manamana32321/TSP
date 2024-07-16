import { RootState } from "@/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import isEqual from "react-fast-compare"
import { GridLevel } from "../../../types/game/position/level"

interface LevelTileProp {
  focused?: boolean
  backgroundColor?: string
  disabled?: boolean
}

function LevelTile({ focused, backgroundColor, disabled }: LevelTileProp) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        backgroundColor: backgroundColor,
      }}
      className={`rounded-lg border border-black ${disabled ? 'opacity-50' : ''}`}
    />
  )
}

export default function GridLevelMap() {
  const position = useSelector((state: RootState) => state.game.playerCharacter?.position, isEqual)
  const level = useSelector((state: RootState) => state.game.playerCharacter?.position?.level, isEqual) as GridLevel | undefined
  
  const [grid, setGrid] = useState<LevelTileProp[][]>()

  useEffect(() => {
    if (!level) return
    setGrid(
      Array.from({ length: level.yLength }, () =>
        Array.from({ length: level.xLength }, () => ({ backgroundColor: 'gray' })))
  )}, [level])

  useEffect(() => {
    console.log(position)
    if (!position) {
      return
    }

    // handle position change
    setGrid(prevGrid => {
      const newGrid = prevGrid?.map((row, y) =>
        row.map((tile, x) => {
          if (x === position.x && y === position.y) {
            return { ...tile, backgroundColor: 'white' }
          }
          return { ...tile, backgroundColor: 'gray' }
        })
      )
      return newGrid
    })
  }, [position])

  const gridClassName = `grid`
  const gridTemplateColumns = `repeat(${level?.xLength}, minmax(0, 1fr))`
  const gridTemplateRows = `repeat(${level?.yLength}, minmax(0, 1fr))`

  return (
    <>
      <p>Map: {position?.level.name}</p>
      <div
        className={gridClassName}
        style={{ gridTemplateColumns, gridTemplateRows, gap: 3, position: 'fixed' }}>
        {
          grid ?
          grid.slice().reverse().flat().map((tile, index) => <LevelTile key={index} {...tile} />)
          :
          ''
        }
      </div>
    </>
  )
}
