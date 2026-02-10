import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";
import * as logic from "./logic";

const startBtn = document.getElementById("startBtn");
const board1 = document.getElementById("board1");
const board2 = document.getElementById("board2");

let player1 = null;
let player2 = null;

startBtn.addEventListener("click", () => {
  [player1, player2] = logic.startGame();
  logic.placeShips();
  makeBoard();
});

function makeBoard() {
  for (let i = 0; i < 10; i++) {
    let row1 = document.createElement("div");
    let row2 = document.createElement("div");
    row1.classList.add("row");
    row2.classList.add("row");
    for (let j = 0; j < 10; j++) {
      let square1 = document.createElement("div");
      //square1.id = `${i}${j}`;
      let square2 = document.createElement("div");
      //square2.id = `${i}${j}`;

      square1.classList.add("square");
      square2.classList.add("square", "clickable");

      // If the square of the first player board contains a ship, we give it a new class
      if (player1.gameboard.board[i][j].ship) square1.classList.add("ship");

      // Attack
      square2.addEventListener("click", () => {
        player2.gameboard.receiveAttack(i, j);
        updateBoard(player2, square2, i, j);
      });

      row1.appendChild(square1);
      row2.appendChild(square2);
    }
    board1.appendChild(row1);
    board2.appendChild(row2);
  }
}

function updateBoard(player, square, i, j) {
  // If the board of the second player is shot in a ship square
  if (player.gameboard.board[i][j].shot && player.gameboard.board[i][j].ship)
    square.classList.add("shot");
  // If the board of the second player gets a missed shot
  if (player.gameboard.board[i][j].shot && !player.gameboard.board[i][j].ship)
    square.classList.add("missedShot");
}

function rerenderBoards(board1, board2) {
  while (board1.firstChild) board1.removeChild(board1.firstChild);
  while (board2.firstChild) board2.removeChild(board2.firstChild);
}
