import { BaseError } from "../error";

export default class GameError extends BaseError {}
export class InvalidTypeError extends GameError {}