export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.length === this.hits) return true;
    else return false;
  }
}

// I HAVE TO ADD WHEN THE HIT IS TWICE OR MORE IN THE SAME SPOT, IT SHOULDNT IMCREMENT HIT
