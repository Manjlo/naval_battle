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
      { name: 'carrier', size: 4 },
    ];

    for (const ship of ships) {
      let validPosition = false;
      let row, column, orientation;
      let currentShip = null;
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
      while (!validPosition) {
        row = prompt(`Ingrese la posicion inicial de la fila para ${ship.name} (A-J):`);
        row = rows.indexOf(row.toUpperCase());
        
        column = parseInt(prompt(`Ingrese la columna inicial para ${ship.name} (0-9):`));
        orientation = prompt(`ingrese la orientación ${ship.name} (h para horizontal, v para vertical):`).toLowerCase();

        if (orientation !== 'h' && orientation !== 'v') {
          alert('orientación inválida. Por favor, intente nuevamente.');
          continue;
        }

        validPosition = true;
        currentShip = new Ship(ship.name, ship.size);

        if (orientation === 'h') {
          if (column + ship.size > 10) {
            alert('Posicion invalida. El barco excede los limites del tablero. Por favor, intente nuevamente.');
            validPosition = false;
            continue;
          }
          //convert letter to number for row A-J
          console.log(row);

          for (let i = column; i < column + ship.size; i++) {
            if (this.playerBoard.board[row][i]) {
              validPosition = false;
              alert('Posicion invalida. Ya hay un barco en esa ubicacion. Por favor, intente nuevamente.');
              break;
            }
          }
        } else if (orientation === 'v') {

  
          
          if (row + ship.size > 10) {
            alert('Posicion invalida. El barco excede los limites del tablero. Por favor, intente nuevamente.');
            validPosition = false;
            continue;
          }

          for (let i = row; i < row + ship.size; i++) {
            if (this.playerBoard.board[i][column]) {
              validPosition = false;
              alert('Posicion invalida. Ya hay un barco en esa ubicacion. Por favor, intente nuevamente.');
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

      this.playerBoard.ships.push(currentShip)
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
