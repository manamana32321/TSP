export default class BaseEntity {
  public readonly id: number
  static lastId: number = 0

  constructor(public name: string) {
    this.id = this.generateId()
  }

  protected generateId(): number {
    BaseEntity.lastId += 1
    return BaseEntity.lastId - 1
  }

  toString() {
    return `BaseEntity: ${this.name}[ID: ${this.id}]`
  }
  
  equals(other: BaseEntity): boolean {
    if (this === other) {
      return true;
    }
    if (!other || !(other instanceof BaseEntity)) {
      return false;
    }
    return this.id === other.id;
  }
}