
const Ship = require("./ship");

describe('Ship object', () => {
    let smallShip, mediumShip, largeShip;

  beforeEach(() => {
        smallShip = new Ship(1);
        mediumShip = new Ship(2);
        largeShip = new Ship(4);
    });

  test('creates ship object', () => {
    const ship = new Ship(3);
    expect(typeof ship).toBe('object');
  });

  test('ship size is set correctly', () => {
    expect(smallShip.getSize()).toBe(1);
    expect(largeShip.getSize()).toBe(4);

  });

  test('ship hits is set correctly', () => {
    expect(smallShip.getHits()).toBe(0);
    expect(mediumShip.getHits()).toBe(0);
    expect(largeShip.getHits()).toBe(0);
  });

  test('ship is getting hitted', () => {
    smallShip.hit();
    expect(smallShip.getHits()).toBe(1);
    largeShip.hit();
    largeShip.hit();
    expect(largeShip.getHits()).toBe(2);
  });

  test('ship is sinked', () => {
    smallShip.hit();
    expect(smallShip.isSunk()).toBe(true);
    expect(largeShip.isSunk()).toBe(false);
  });
});
