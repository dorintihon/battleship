const Ship = require('./ship');

describe('Ship', () => {
  let smallShip, mediumShip, largeShip;

  beforeEach(() => {
    smallShip = new Ship(1);
    mediumShip = new Ship(2);
    largeShip = new Ship(4);
  });

  test('creates a Ship instance', () => {
    const ship = new Ship(3);
    expect(ship).toBeInstanceOf(Ship);
    expect(typeof ship).toBe('object');
  });

  test.each([
    [1],
    [2],
    [4],
  ])('size is set correctly for length %i', (len) => {
    const ship = new Ship(len);
    expect(ship.getSize()).toBe(len);
  });

  test('initial hits are 0', () => {
    expect(smallShip.getHits()).toBe(0);
    expect(mediumShip.getHits()).toBe(0);
    expect(largeShip.getHits()).toBe(0);
  });

  test('increments hits on hit()', () => {
    smallShip.hit();
    expect(smallShip.getHits()).toBe(1);

    largeShip.hit();
    largeShip.hit();
    expect(largeShip.getHits()).toBe(2);
  });

  test('isSunk() reflects hits vs length (boundary cases)', () => {
    // Not sunk initially
    expect(largeShip.isSunk()).toBe(false);

    // Sinks exactly at hits === length
    mediumShip.hit();
    expect(mediumShip.isSunk()).toBe(false);
    mediumShip.hit();
    expect(mediumShip.isSunk()).toBe(true);
  });

  test('hitting beyond length does not break state (clamps at length)', () => {
    // If you choose to clamp hits at length:
    for (let i = 0; i < 10; i++) smallShip.hit();
    expect(smallShip.getHits()).toBe(1); // <= clamp to size
    expect(smallShip.isSunk()).toBe(true);
  });

  // Optional: constructor validation if you implement it
  test('throws on invalid length (<= 0 or non-integer)', () => {
    expect(() => new Ship(0)).toThrow();
    expect(() => new Ship(-3)).toThrow();
    expect(() => new Ship(2.5)).toThrow();
  });
});
