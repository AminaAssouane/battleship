import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

let player1;
let player2;

export function startGame() {
  player1 = new Player("human");
  player2 = new Player("computer");
  return [player1, player2];
}

export function placeShips() {
  // ship 2
  player1.gameboard.placeShip(player1.gameboard.ships[0], false, 0, 0);

  // ship 3
  player1.gameboard.placeShip(player1.gameboard.ships[1], true, 1, 3);

  // ship 3
  player1.gameboard.placeShip(player1.gameboard.ships[2], false, 2, 6);

  // ship 4
  player1.gameboard.placeShip(player1.gameboard.ships[3], false, 7, 2);

  player1.gameboard.placeShip(player1.gameboard.ships[4], false, 9, 4);

  player2.gameboard.placeShip(player2.gameboard.ships[0], false, 0, 0);

  // ship 3
  player2.gameboard.placeShip(player2.gameboard.ships[1], true, 1, 3);

  // ship 3
  player2.gameboard.placeShip(player2.gameboard.ships[2], false, 2, 6);

  // ship 4
  player2.gameboard.placeShip(player2.gameboard.ships[3], false, 7, 2);

  player2.gameboard.placeShip(player2.gameboard.ships[4], false, 9, 4);
}
