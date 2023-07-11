// --- Model ---

class Ship {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.positions = [];
    this.sunk = false;
  }

  addPosition(row, column) {
    this.positions.push({ row, column });
  }

  wasHit(row, column) {
    for (const position of this.positions) {
      if (position.row === row && position.column === column) {
        return true;
      }
    }
    return false;
  }

  checkSinking() {
    for (const position of this.positions) {
      if (!position.hit) {
        return false;
      }
    }
    this.sunk = true;
    return true;
  }
}

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



// --- Controller ---

class Controller {
  constructor() {
    this.playerBoard = new Board(10, 10);
    this.opponentBoard = new Board(10, 10);
    this.view = new View(this);
  }

  startGame() {
    this.view.initializePlayerBoard();
    this.placeShips();
    this.view.renderPlayerBoard(this.playerBoard);
    this.view.renderOpponentBoard(this.opponentBoard);
    this.view.showMessage('Let the naval battle begin!');
  }

  placeShips() {
    // Logic to place ships on the player's board
    // You can implement your own logic here or let the player do it
  }

  makeShot(row, column) {
    const result = this.opponentBoard.receiveShot(row, column);
    if (result === 'hit') {
      this.view.showMessage('Hit!');
    } else if (result === 'sunk') {
      this.view.showMessage('Ship sunk!');
    } else {
      this.view.showMessage('Water!');
    }

    if (this.opponentBoard.isComplete()) {
      this.view.showMessage('You won the game!');
    } else {
      this.makeComputerShot();
    }
  }

  makeComputerShot() {
    // Logic for the computer to make a random shot on the player's board
  }
}

// --- Game Initialization ---

const controller = new Controller();
controller.startGame();
