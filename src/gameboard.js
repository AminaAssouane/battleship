import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null)); // Our 10x10 gameboard

    this.fillBoard();

    this.ships = [
      new Ship(2),
      new Ship(3),
      new Ship(3),
      new Ship(4),
      new Ship(5),
    ];
  }

  // We fill the board with an object containing the properties ship and shot
  fillBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = { ship: null, shot: false };
      }
    }
  }

  // Method to check if our ship is inside the board
  withinBoard(ship, rotate, startX, startY) {
    // We first check that our starting position is inside the board
    if (startX < 0 || startX > 9) return false;
    if (startY < 0 || startY > 9) return false;

    // Then we check if our ending position is inside the board
    if (!rotate) {
      if (startY + ship.length - 1 > 9) return false;
    } else {
      if (startX + ship.length - 1 > 9) return false;
    }

    return true;
  }

  // Method to check if our ship is being added on empty squares
  emptyPositions(ship, rotate, startX, startY) {
    if (!rotate) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[startX][startY + i].ship) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[startX + i][startY].ship) return false;
      }
    }
    return true;
  }

  /*// Check if the place where to put the ship is empty and within the board
  possiblePlace(ship, rotate, startX, startY) {
    // Checking if it's empty
    if (!this.emptyPositions(ship, rotate, startX, startY)) return false;
    // Checking if it's within the board
    else if (!this.emptyPositions(ship, rotate, startX, startY)) return false;
    // If all is good return true
    else return true;
  }*/

  placeShip(ship, rotate, startX, startY) {
    if (!this.withinBoard(ship, rotate, startX, startY))
      return "Positions selected are outside of the board";
    else if (!this.emptyPositions(ship, rotate, startX, startY))
      return "Positions selected not empty";
    if (!rotate) {
      for (let i = 0; i < ship.length; i++)
        this.board[startX][startY + i].ship = ship;
      return "Successfully placed non-rotated ship";
    } else {
      for (let i = 0; i < ship.length; i++)
        this.board[startX + i][startY].ship = ship;
      return "Successfully placed rotated ship";
    }
  }

  receiveAttack(x, y) {
    if (this.board[x][y].ship && !this.board[x][y].shot) {
      this.board[x][y].shot = true;
      this.board[x][y].ship.hit();
    } else if (!this.board[x][y].ship && !this.board[x][y].shot) {
      this.board[x][y].shot = true;
    }
  }
  /*
  function sendAttack(square, i, j) {
  if (
    player2.gameboard.board[i][j].ship &&
    !player2.gameboard.board[i][j].shot
  ) {
    player2.gameboard.board[i][j].shot = true;
    player2.gameboard.board[i][j].ship.hit();
    square.classList.remove("clickable");
    square.classList.add("shot");
  } else if (
    !player2.gameboard.board[i][j].ship &&
    !player2.gameboard.board[i][j].shot
  ) {
    player2.gameboard.board[i][j].shot = true;
    square.classList.remove("clickable");
    square.classList.add("missedShot");
  }
}*/

  hasLost() {
    for (let i = 0; i < 5; i++) {
      if (!this.ships[i].isSunk()) return false;
    }
    return true;
  }
}
