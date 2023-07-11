
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