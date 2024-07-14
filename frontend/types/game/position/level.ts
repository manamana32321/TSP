import BaseEntity from "../base";
import Position from "./";
import { InvalidPositionError } from "./error";

export default class Level extends BaseEntity {
  public startingTileX = 0
  public startingTileY = 0

  constructor(public name: string) {
    super(name)
  }
}

export class GridLevel extends Level {
  private grid: Position[][]
  constructor(
    public name: string,
    private readonly xLength: number,
    private readonly yLength: number,
  ) {
    super(name);
    this.grid = this.createGrid(xLength, yLength);
  }

  private createGrid(xLength: number, yLength: number): Position[][] {
    const grid: Position[][] = [];
    for (let y = 0; y < yLength; y++) {
      grid[y] = new Array(xLength).fill(null)
    }
    for (let y = 0; y < yLength; y++) {
      for (let x = 0; x < xLength; x++) {
        grid[y][x] = new Position(this, x, y)
      }
    }
    return grid;
  }

  isValidTilePosition(x: number, y: number): boolean {
    if (x < this.xLength && y < this.yLength) return true
    return false
  }

  getTile(x: number, y: number) {
    if (!this.isValidTilePosition(x, y)) {
      throw new InvalidPositionError(`No tile found on (${x}, ${y})`)
    }
    return this.grid[y][x]
  }
}