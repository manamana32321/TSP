import BaseEntity from "../base";
import Tile from "./tile";
import { InvalidPositionError } from "./error";

export enum Direction { North, South, East, West }
export enum GridDirection { Up = "w", Down = "s", Left = "a", Right = "d" }

export default abstract class Level extends BaseEntity {
  public startingTileX = 0
  public startingTileY = 0

  constructor(public name: string) {
    super(name)
  }

  abstract isValidTile(x: number, y: number): boolean
  abstract toString(): string
}

export class GridLevel extends Level {
  private grid: Tile[][]
  constructor(
    public name: string,
    public readonly xLength: number,
    public readonly yLength: number,
  ) {
    super(name);
    this.grid = this.createGrid(xLength, yLength);
  }

  private createGrid(xLength: number, yLength: number): Tile[][] {
    const grid: Tile[][] = [];
    for (let y = 0; y < yLength; y++) {
      grid[y] = new Array(xLength).fill(null)
    }
    for (let y = 0; y < yLength; y++) {
      for (let x = 0; x < xLength; x++) {
        grid[y][x] = new Tile(x, y)
      }
    }
    return grid;
  }

  private _validateTile(x: number, y: number) {
    if (x >= this.xLength || y >= this.yLength) {
      throw new InvalidPositionError(
        `Tile (${x}, ${y}) exceeds level limit(${this.xLength}, ${this.yLength})`)
      }
    
    if (x < 0 || y < 0) {
      throw new InvalidPositionError(
        `Tile (${x}, ${y}) is below (0, 0)`
      )
    }
    return true
  }

  isValidTile(x: number, y: number): boolean {
    try {
      return this._validateTile(x, y)
    }
    catch(e) {
      if (e instanceof InvalidPositionError) return false
      throw e
    }
  }

  getTile(x: number, y: number)
  {
    this._validateTile(x, y)
    return this.grid[y][x]
  }

  toString() {
    return this.name
  }
}