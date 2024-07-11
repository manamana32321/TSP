import GameError from "../error";

export class LevelError extends GameError {}
export class TileDoesNotExistError extends LevelError {}