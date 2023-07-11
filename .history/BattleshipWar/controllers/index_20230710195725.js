import { Board, Ship } from "../models/js/index.js";
import View from "../views/index.js";


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
    const ships = [
      { name: 'Carrier', size: 4 },
      { name: 'Submarine1', size: 3 },
      { name: 'Submarine2', size: 3 },
      { name: 'Destroyer1', size: 2 },
      { name: 'Destroyer2', size: 2 },
      { name: 'Destroyer3', size: 2 },
      { name: 'Frigate1', size: 1 },
      { name: 'Frigate2', size: 1 },
      { name: 'Frigate3', size: 1 },
      { name: 'Frigate4', size: 1 }
    ];

    for (const ship of ships) {
      let validPosition = false;
      let row, column, orientation;
      let currentShip = null;

      while (!validPosition) {
        row = parseInt(prompt(`Enter the starting row for the ${ship.name} (0-9):`));
        column = parseInt(prompt(`Enter the starting column for the ${ship.name} (0-9):`));
        orientation = prompt(`Enter the orientation for the ${ship.name} (h for horizontal, v for vertical):`).toLowerCase();

        if (orientation !== 'h' && orientation !== 'v') {
          alert('Invalid orientation. Please try again.');
          continue;
        }

        validPosition = true;
        currentShip = new Ship(ship.name, ship.size);

        if (orientation === 'h') {
          if (column + ship.size > 10) {
            alert('Invalid position. The ship exceeds the board boundaries. Please try again.');
            validPosition = false;
            continue;
          }

          for (let i = column; i < column + ship.size; i++) {
            if (this.playerBoard.board[row][i]) {
              validPosition = false;
              alert('Invalid position. There is already a ship in that location. Please try again.');
              break;
            }
          }
        } else if (orientation === 'v') {
          if (row + ship.size > 10) {
            alert('Invalid position. The ship exceeds the board boundaries. Please try again.');
            validPosition = false;
            continue;
          }

          for (let i = row; i < row + ship.size; i++) {
            if (this.playerBoard.board[i][column]) {
              validPosition = false;
              alert('Invalid position. There is already a ship in that location. Please try again.');
              break;
            }
          }
        }
      }

      // Event listeners for ship controls
      const moveLeft = () => {
        if (orientation === 'h') {
          if (column > 0) {
            for (let i = 0; i < currentShip.size; i++) {
              this.playerBoard.board[row][column + i] = null;
              this.playerBoard.board[row][column - 1 + i] = currentShip;
              currentShip.positions[i].column = column - 1 + i;
            }
            column--;
          }
        } else if (orientation === 'v') {
          if (row > 0) {
            for (let i = 0; i < currentShip.size; i++) {
              this.playerBoard.board[row + i][column] = null;
              this.playerBoard.board[row - 1 + i][column] = currentShip;
              currentShip.positions[i].row = row - 1 + i;
            }
            row--;
          }
        }
        this.view.renderPlayerBoard(this.playerBoard);
      };

      const moveRight = () => {
        if (orientation === 'h') {
          if (column + currentShip.size < 10) {
            for (let i = 0; i < currentShip.size; i++) {
              this.playerBoard.board[row][column + i] = null;
              this.playerBoard.board[row][column + 1 + i] = currentShip;
              currentShip.positions[i].column = column + 1 + i;
            }
            column++;
          }
        } else if (orientation === 'v') {
          if (row + currentShip.size < 10) {
            for (let i = 0; i < currentShip.size; i++) {
              this.playerBoard.board[row + i][column] = null;
              this.playerBoard.board[row + 1 + i][column] = currentShip;
              currentShip.positions[i].row = row + 1 + i;
            }
            row++;
          }
        }
        this.view.renderPlayerBoard(this.playerBoard);
      };

      const flipShip = () => {
        if (orientation === 'h') {
          if (row + currentShip.size <= 10) {
            for (let i = 0; i < currentShip.size; i++) {
              this.playerBoard.board[row + i][column] = null;
              this.playerBoard.board[row + i][column + i] = currentShip;
              currentShip.positions[i].row = row + i;
              currentShip.positions[i].column = column + i;
            }
            orientation = 'v';
          }
        } else if (orientation === 'v') {
          if (column + currentShip.size <= 10) {
            for (let i = 0; i < currentShip.size; i++) {
              this.playerBoard.board[row][column + i] = null;
              this.playerBoard.board[row + i][column + i] = currentShip;
              currentShip.positions[i].row = row + i;
              currentShip.positions[i].column = column + i;
            }
            orientation = 'h';
          }
        }
        this.view.renderPlayerBoard(this.playerBoard);
      };

      // Register ship controls
      const shipControls = {
        moveLeft,
        moveRight,
        flipShip
      };

      // Event listeners for ship controls
      document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          shipControls.moveLeft();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          shipControls.moveRight();
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          shipControls.flipShip();
        }
      });

      // Add the ship to the player's board and ships array
      if (orientation === 'h') {
        for (let i = column; i < column + ship.size; i++) {
          this.playerBoard.board[row][i] = currentShip;
          currentShip.addPosition(row, i);
        }
      } else if (orientation === 'v') {
        for (let i = row; i < row + ship.size; i++) {
          this.playerBoard.board[i][column] = currentShip;
          currentShip.addPosition(i, column);
        }
      }

      this.playerBoard.ships.push(currentShipAquí)
      // You can implement your own logic here or let the player do it
    }
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
