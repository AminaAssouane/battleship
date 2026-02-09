import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

export function startGame() {
  const player1 = new Player("human");
  const player2 = new Player("computer");
  return [player1, player2];
}
