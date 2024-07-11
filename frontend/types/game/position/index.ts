import Level from "./level";
import Tile from "./tile";

export default class Position {
  constructor(
    public level: Level,
    public tile: Tile,
  ) {}
}

export interface Placable {
  position: Position | null
}