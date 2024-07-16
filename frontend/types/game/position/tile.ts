export default class Tile {
  public name: string | null = null
  public description: string | null = null
  public blocked: boolean=false
  public backgroundColor: string = '#FFFFFF'
  public border: boolean=true
  public borderThickness: number=1
  public borderColor: string = 'black'

  constructor(
    public readonly x: number,
    public readonly y: number,
  ) { }

  toString() {
    return `(${this.x}, ${this.y})`
  }
}