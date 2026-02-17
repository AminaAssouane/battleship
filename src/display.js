import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";
import * as logic from "./logic";

const startBtn = document.getElementById("startBtn");
const board1 = document.getElementById("board1");
const board2 = document.getElementById("board2");
const shipsContainer = document.getElementById("ships-container");

const player1Squares = [];

let ships = [];
let selectedShip = null;

let player1 = null;
let player2 = null;

startBtn.addEventListener("click", () => {
  resetBoard();
  [player1, player2] = logic.startGame();
  // player1.gameboard.randomPlaceShips();
  player2.gameboard.randomPlaceShips();
  makeBoard();
  makeShips();
  placeShips();
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
        if (player2.gameboard.board[i][j].shot) return; // this to avoid re-attacking the same square
        player2.gameboard.receiveAttack(i, j);
        square2.classList.remove("clickable");
        updateBoard(player2, square2, i, j);
        if (player2.gameboard.hasLost()) {
          resetBoard();
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
            resetBoard();
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

function resetBoard() {
  board1.textContent = "";
  board2.textContent = "";
  shipsContainer.textContent = "";
}

/* Trying to make the selection of ships happen */

// We use the index to be able to map the ship divs to the ships in gameboard, so to link UI and logic
function makeShip(length, index) {
  const ship = document.createElement("div");
  for (let i = 0; i < length; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.classList.add("ship");
    ship.appendChild(square);
  }

  ship.classList.add("row", "clickable");

  ship.addEventListener("click", () => {
    selectedShip = ship;
    ships.forEach((item) => item.classList.remove("selected-ship"));
    ship.classList.add("selected-ship");
    selectedShip.id = index;
  });

  shipsContainer.appendChild(ship);
  return ship;
}

function makeShips() {
  ships.push(makeShip(2, 0));
  ships.push(makeShip(3, 1));
  ships.push(makeShip(3, 2));
  ships.push(makeShip(4, 3));
  ships.push(makeShip(5, 4));
}

function placeShips() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      player1Squares[i][j].classList.add("clickable");
      player1Squares[i][j].addEventListener("click", () => {
        let ship = player1.gameboard.ships[selectedShip.id];
        if (player1.gameboard.placeShip(ship, false, i, j)) {
          console.log(selectedShip.id);
          shipsContainer.removeChild(selectedShip);
          // We add class ship to the square to paint it
          for (let x = 0; x < selectedShip.children.length; x++) {
            player1Squares[i][j + x].classList.add("ship");
          }
        }
      });
    }
  }
}
