import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import isEqual from "react-fast-compare";
import { GridLevel } from "../../../types/game/position/level";
import GridLevelMap from "../shared/LevelMap";

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
    <div style={{ overflow: 'hidden', height, backgroundColor }} className="rounded-lg">
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

export interface LevelTileProp {
  size: number
  focused?: boolean
  backgroundColor?: string
  disabled?: boolean
}

export function LevelTile({ size, focused, backgroundColor, disabled }: LevelTileProp) {
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

export default function GridLevelMiniMap() {
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
    <div className="bg-secondary rounded-lg" style={{ overflow: 'hidden' }}>
      <p className="bg-primary rounded-lg py-1 px-2 text-white mb-1">Map: {position?.level.name}</p>
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
          <GridLevelMap
            grid={grid}
            cols={level.xLength} rows={level.yLength}
            gap={tileGap} zIndex={1} />
        </TileSetWrapper>
       : ""}
    </div>
  );
}
