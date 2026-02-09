import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null)); // Our 10x10 gameboard

    this.ships = [
      new Ship(2),
      new Ship(3),
      new Ship(3),
      new Ship(4),
      new Ship(5),
    ];

    this.missedShots = new Array(100);
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

  // [[0,1,2,3,4,5],[0,1,2,3,4,5],[0,1,2,3,4,5],[0,1,2,3,4,5],[0,1,2,3,4,5]]
  // Method to check if our ship is being added on empty squares
  emptyPositions(ship, rotate, startX, startY) {
    if (!rotate) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[startX][startY + i]) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[startX + i][startY]) return false;
      }
    }
    return true;
  }

  // Check if the place where to put the ship is empty and within the board
  possiblePlace(ship, rotate, startX, startY) {
    // Checking if it's empty
    if (!this.emptyPositions(ship, rotate, startX, startY)) return false;
    // Checking if it's within the board
    else if (!this.emptyPositions(ship, rotate, startX, startY)) return false;
    // If all is good return true
    else return true;
  }

  placeShip(ship, rotate, startX, startY) {
    if (!this.withinBoard(ship, rotate, startX, startY))
      return "Positions selected are outside of the board";
    else if (!this.emptyPositions(ship, rotate, startX, startY))
      return "Positions selected not empty";
    if (!rotate) {
      for (let i = 0; i < ship.length; i++)
        this.board[startX][startY + i] = ship;
      return "Successfully placed non-rotated ship";
    } else {
      for (let i = 0; i < ship.length; i++)
        this.board[startX + i][startY] = ship;
      return "Succsessfully placed rotated ship";
    }
  }

  receiveAttack(x, y) {
    if (this.board[x][y]) this.board[x][y].hit();
    else this.missedShots.push(x, y);
  }

  hasLost() {
    for (let i = 0; i < 5; i++) {
      if (!this.ships[i].isSunk) return false;
    }
    return true;
  }
}
