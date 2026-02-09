import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

const board = new Gameboard();

const message1 = board.placeShip(board.ships[0], false, 0, 0);
const message2 = board.placeShip(board.ships[1], false, 0, 1);
