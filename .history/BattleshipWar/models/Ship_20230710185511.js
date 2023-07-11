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

export default Ship;
