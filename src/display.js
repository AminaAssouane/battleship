import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";
import * as logic from "./logic";

const startBtn = document.getElementById("startBtn");
const board1 = document.getElementById("board1");
const board2 = document.getElementById("board2");

const player1Squares = [];

let player1 = null;
let player2 = null;

startBtn.addEventListener("click", () => {
  [player1, player2] = logic.startGame();
  logic.placeShips();
  makeBoard();
});

function makeBoard() {
  for (let i = 0; i < 10; i++) {
    player1Squares[i] = [];
    let row1 = document.createElement("div");
    let row2 = document.createElement("div");
    row1.classList.add("row");
    row2.classList.add("row");
    for (let j = 0; j < 10; j++) {
      let square1 = document.createElement("div");
      let square2 = document.createElement("div");

      square1.classList.add("square");
      square2.classList.add("square", "clickable");

      player1Squares[i][j] = square1; // We store the player1's squares so we can update them when the enemy attacks

      // If the square of the first player board contains a ship, we give it a new class
      if (player1.gameboard.board[i][j].ship) square1.classList.add("ship");

      // Attack
      square2.addEventListener("click", () => {
        player2.gameboard.receiveAttack(i, j);
        updateBoard(player2, square2, i, j);
        if (player2.gameboard.hasLost()) {
          alert("Player 2 lost!");
          return;
        }
        setTimeout(() => {
          let move = player2.makeMove(player1.gameboard);
          updateBoard(
            player1,
            player1Squares[move[0]][move[1]],
            move[0],
            move[1],
          );
          if (player1.gameboard.hasLost()) {
            alert("Player 1 lost!");
            return;
          }
        }, 500);
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
