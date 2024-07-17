import { NotImplementedError } from "../../types/error";
import Actor from "../../types/game/actor";
import GameError from "../../types/game/error";
import Position from "../../types/game/position";
import Level, { GridLevel } from "../../types/game/position/level";
import { Direction, GridDirection } from "../../types/game/position/level";
import { setEntityPosition } from "@/app/gameSlice";

export abstract class BaseMovement<L extends Level> {
  protected abstract readonly dispatch: any

  abstract travel(actor: Actor<L>, direction: Direction | GridDirection): Position<L> | null
  abstract teleport(actor: Actor<L>, position: Position<L>): Position<L> | null
}

export default class Movement<L extends Level> extends BaseMovement<L> {
  constructor(
    protected readonly dispatch: any
  ) {
    super()
  }

  handleKeyPress(e: KeyboardEvent, actor: Actor<L>) {
    const keyMap: { [key: string]: GridDirection } = {
      "w": GridDirection.Up,
      "s": GridDirection.Down,
      "a": GridDirection.Left,
      "d": GridDirection.Right
    };

    const direction = keyMap[e.key];
    if (direction !== undefined) {
      this.travel(actor, direction);
    }
  }

  travel(actor: Actor<L>, direction: GridDirection): Position<L> | null {
    const currentLevel = actor.position?.level
    const currentPosition = actor.position
    if (!currentPosition) {
      throw new MovementError(`Actor '${actor}' has no base position`)
    }

    if (currentLevel instanceof GridLevel) {
      const { newPositionX, newPositionY } = this._calculateTile(currentPosition, direction)
    
      if (currentLevel.isValidTile(newPositionX, newPositionY)) {
        const newPosition = new Position(currentLevel, newPositionX, newPositionY)
        this.dispatch(setEntityPosition([actor, newPosition]))
        console.log(`${actor} traveled ${currentPosition} -> ${newPosition}`)
        return newPosition
      }
      console.warn(`${actor} failed to travel ${currentPosition} -> ${currentLevel}(${newPositionX}, ${newPositionY})`)
      return null
    }

    throw new NotImplementedError()
  }

  private _calculateTile(currentPosition: Position<L>, direction: GridDirection) {
    let newPositionX = currentPosition.x
    let newPositionY = currentPosition.y
    switch (direction) {
      case 'w':
        newPositionY += 1
        break
      case 's':
        newPositionY -= 1
        break
      case 'a':
        newPositionX -= 1
        break
      case 'd':
        newPositionX += 1
        break
    }
    return { newPositionX, newPositionY }
  }

  teleport(actor: Actor<L>, position: Position<L>): Position<L> | null {
    throw new NotImplementedError()
  }
}

export class MovementError extends GameError {}