class Board {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.board = this.createBoard();
    this.ships = [];
    this.remainingShips = 0;
  }

  createBoard() {
    const board = [];
    for (let i = 0; i < this.rows; i++) {
      board[i] = new Array(this.columns).fill(null);
    }
    return board;
  }

  addShip(ship) {
    for (const position of ship.positions) {
      const { row, column } = position;
      this.board[row][column] = ship;
    }
    this.ships.push(ship);
    this.remainingShips++;
  }

  receiveShot(row, column) {
    const ship = this.board[row][column];
    if (ship) {
      if (ship.wasHit(row, column)) {
        return 'hit';
      }
      ship.positions.find(
        (position) =>
          position.row === row && position.column === column
      ).hit = true;
      if (ship.checkSinking()) {
        this.remainingShips--;
        return 'sunk';
      }
      return 'hit';
    } else {
      return 'water';
    }
  }

  isComplete() {
    return this.remainingShips === 0;
  }
}