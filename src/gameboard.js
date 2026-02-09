import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
  }

  placeShip(startX, startY, endX, endY) {}

  receiveAttack(x, y) {}
}
