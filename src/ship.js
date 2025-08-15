class Ship {
  constructor(length) {
    if (!Number.isInteger(length) || length <= 0) {
      throw new Error('Ship length must be a positive integer');
    }
    this._length = length;
    this._hits = 0;
  }

  getSize() {
    return this._length;
  }

  getHits() {
    return this._hits;
  }

  hit() {
    // clamp so hits never exceed length
    if (this._hits < this._length) {
      this._hits += 1;
    }
  }

  isSunk() {
    return this._hits >= this._length;
  }
}

module.exports = Ship;
