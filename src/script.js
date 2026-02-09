import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

const board = new Gameboard();

export const message1 = board.placeShip(board.ships[0], false, 0, 0);
export const message2 = board.placeShip(board.ships[1], false, 0, 1);
export const message3 = board.placeShip(board.ships[4], true, 8, 1);
export const message4 = board.placeShip(board.ships[4], true, 2, 4);

export let beforeHit = board.ships[4].hits;
board.receiveAttack(4, 4);
export let afterHit = board.ships[4].hits;

board.receiveAttack(3, 7);
export let missedShot = board.missedShots[0];

console.log(board.board);
console.log(board.missedShots);
