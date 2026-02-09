import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

const board = new Gameboard();

export const message1 = board.placeShip(board.ships[0], false, 0, 0);
export const message2 = board.placeShip(board.ships[1], false, 0, 1);

console.log(board.board);
