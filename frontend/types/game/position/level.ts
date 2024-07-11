import BaseEntity from "../base";
import Tile from "./tile";
import { TileDoesNotExistError } from "./error";

export default class Level extends BaseEntity {
  constructor(public name: string) {
    super(name)
  }
}

export class GridLevel extends Level {
  private grid: Tile[][]

  constructor(
    public name: string,
    private readonly xLength: number,
    private readonly yLength: number,
  ) {
    super(name);
    this.grid = this.createGrid(xLength, yLength);
  }

  private createGrid(xLength: number, yLength: number): Tile[][] {
    const grid: Tile[][] = [];
    for (let y = 0; y < yLength; y++) {
      grid[y] = new Array(xLength).fill(new Tile(this))
    }
    return grid;
  }

  isValidTilePosition(x: number, y: number): boolean {
    if (x < this.xLength && y < this.yLength) return true
    return false
  }

  getTile(x: number, y: number) {
    if (!this.isValidTilePosition(x, y)) {
      throw new TileDoesNotExistError(`No tile found on (${x}, ${y})`)
    }
    return this.grid[y][x]
  }
}