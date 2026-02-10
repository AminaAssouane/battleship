import { Gameboard } from "./gameboard";

export class Player {
  constructor(isComputer) {
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  makeMove(enemyBoard) {
    if (!this.isComputer) return;

    let x, y;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (enemyBoard.board[x][y].shot);

    enemyBoard.receiveAttack(x, y);
    return [x, y];
  }
}
