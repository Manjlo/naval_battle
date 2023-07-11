// --- View ---

class View {
  constructor(controller) {
    this.controller = controller;
    this.playerBoard = document.getElementById('player-board');
    this.opponentBoard = document.getElementById('opponent-board');
    this.message = document.getElementById('message');
  }

  initializePlayerBoard() {
    this.playerBoard.addEventListener('click', (event) => {
      const row = parseInt(event.target.dataset.row);
      const column = parseInt(event.target.dataset.column);
      this.controller.makeShot(row, column);
    });
  }

  renderPlayerBoard(board) {
    this.playerBoard.innerHTML = '';
    for (let i = 0; i < board.rows; i++) {
      for (let j = 0; j < board.columns; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = i;
        cell.dataset.column = j;

        const ship = board.board[i][j];
        if (ship) {
          cell.style.backgroundImage = `url(../assets/${ship.name}.png)`; // Ruta a la imagen del barco
          cell.classList.add('ship-image');
        }



        this.playerBoard.appendChild(cell);
      }
    }
  }


  renderOpponentBoard(board) {
    this.opponentBoard.innerHTML = '';
    for (let i = 0; i < board.rows; i++) {
      for (let j = 0; j < board.columns; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (board.board[i][j]) {
          cell.classList.add('ship');
        }
        this.opponentBoard.appendChild(cell);
      }
    }
  }

  showMessage(message) {
    this.message.textContent = message;
  }
}


export default View;