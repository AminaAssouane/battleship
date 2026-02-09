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
      let square2 = document.createElement("div");
      square1.classList.add("square");
      square2.classList.add("square");
      row1.appendChild(square1);
      row2.appendChild(square2);
    }
    board1.appendChild(row1);
    board2.appendChild(row2);
  }
}
