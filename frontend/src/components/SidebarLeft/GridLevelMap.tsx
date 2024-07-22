import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import isEqual from "react-fast-compare";
import { GridLevel } from "../../../types/game/position/level";

interface TileSetWrapperProp {
  children: React.ReactNode
  height?: number
  backgroundColor?: string
  tileSize: number
  tileGap: number
  mapColumns: number
  mapRows: number
  positionX: number
  positionY: number
}

function TileSetWrapper({
  children, height, backgroundColor, tileSize, tileGap, mapColumns, mapRows,
  positionX, positionY }: TileSetWrapperProp) {
  const mapWidth = (tileSize + tileGap) *  mapColumns - tileGap
  const mapHeight = (tileSize + tileGap) *  mapRows - tileGap

  const translateX = -positionX * (tileSize + tileGap) - tileSize/2
  const translateY = positionY * (tileSize + tileGap) - mapHeight/2 - tileSize*1.5

  return (
    <div style={{ overflow: 'hidden', height, backgroundColor }}>
      <div
        style={{
          width: mapWidth, height: mapHeight, backgroundColor,
          transform: `translate(${translateX}px, ${translateY}px)`,
          position: "relative", left: '50%', zIndex: 100,
          }}
        >
        {children}
      </div>
    </div>
  )
}

interface TileSetProp {
  grid: LevelTileProp[][]
  cols: number
  rows: number
  gap: number
  zIndex: number
}

function TileSet({ grid, cols, rows, gap, zIndex }: TileSetProp) {
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

interface LevelTileProp {
  size: number
  focused?: boolean
  backgroundColor?: string
  disabled?: boolean
}

function LevelTile({ size, focused, backgroundColor, disabled }: LevelTileProp) {
  backgroundColor = focused ? "white" : "gray"
  const border = focused ? "border border-2 border-rose-500" : "border border-black"
  const opacity = disabled ? "opacity-50" : ""

  return (
    <div
      style={{
        width: size, height: size,
        backgroundColor,
      }}
      className={`rounded-lg ${border} ${opacity}`}
    />
  );
}

export default function GridLevelMap() {
  const position = useSelector((state: RootState) => state.game.playerCharacter?.position, isEqual);
  const level = useSelector((state: RootState) => state.game.playerCharacter?.position?.level, isEqual) as GridLevel | undefined;

  const [grid, setGrid] = useState<LevelTileProp[][]>();
  const tileSize = 48
  const tileGap = 3

  // Draw all tiles on level change
  useEffect(() => {
    if (!level) return;
    setGrid(
      Array.from({ length: level.yLength }, () =>
        Array.from({ length: level.xLength }, () => ({ size: tileSize }))
      )
    );
  }, [level]);

  // Change 'focused' status on position change
  useEffect(() => {
    if (!position) return;

    setGrid((prevGrid) => {
      const newGrid = prevGrid?.map((row, y) =>
        row.map((tile, x) => {
          if (x === position.x && y === position.y) {
            return { ...tile, focused: true };
          }
          return { ...tile, focused: false };
        })
      );
      return newGrid;
    });
  }, [position]);

  return (
    <>
      <p>Map: {position?.level.name}</p>
      {grid && level && position ? 
        <TileSetWrapper
          backgroundColor="black"
          height={500}
          tileSize={tileSize}
          tileGap={3}
          mapColumns={level.xLength}
          mapRows={level.yLength}
          positionX={position.x}
          positionY={position.y}
          >
          <TileSet
            grid={grid}
            cols={level.xLength} rows={level.yLength}
            gap={tileGap} zIndex={1} />
        </TileSetWrapper>
       : ""}
    </>
  );
}
