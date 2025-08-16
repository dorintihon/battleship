const Gameboard = require('./gameboard');
const Ship = require('./ship');

describe('Gameboard', () => {
    let board;

    beforeEach(() => {
        board = new Gameboard;
    });

    test('creates a Gameboard instance', () => {
        expect(board).toBeInstanceOf(Gameboard);
        expect(typeof board).toBe('object');
    });

    test('buildGrid generates all 64 coordinates of an 8x8 grid', () => {
        // 1. Should have 8 rows
        expect(board.grid.length).toBe(8);

        // 2. Should have 8 columns
        board.grid.forEach(row => {
            expect(row.length).toBe(8);
        });
    });

    describe('Placing Ship', () => {
        test('placing a ship on the board', () => {
            const ship = board.placeShip('smallShip', 2, 3, 'H'); // length=1

            // Returned value is a Ship with correct size
            expect(ship).toBeInstanceOf(Ship);
            expect(ship.getSize()).toBe(1);
            expect(ship.getHits()).toBe(0);

            // The grid cell contains the **same object** reference
            expect(board.grid[2][3]).toBe(ship);
            expect(board.grid[2][4]).toEqual(null);
            expect(board.grid[2][2]).toEqual(null);
            expect(board.grid[1][3]).toEqual(null);
            expect(board.grid[3][3]).toEqual(null);
        });

        test('cannot place single-cell ship out of bounds', () => {
            expect(() => board.placeShip('smallShip', 8, 0, 'H')).toThrow(); // x=8 is OOB
        });

        test('cannot overlap existing ship', () => {
            board.placeShip('smallShip', 2, 3, 'H');
            expect(() => board.placeShip('smallShip', 2, 3, 'H')).toThrow(); // same cell
        });

        test('board is initialized with no ships', () => {
            expect(board.ships.length).toBe(0);
        })
    });
    
    describe('Attacking Ship', () => {
        test('Ship gets hitted by coordinate', () => {
            const ship = board.placeShip('smallShip', 2, 3, 'H');
            expect(board.receiveAttack(2,3)).toBe(true);
            expect(board.receiveAttack(2,4)).toBe(false);
            expect(board.grid[2][4]).toEqual('miss');
            expect(ship.getHits()).toBe(1);
            expect(ship.isSunk()).toBe(true);
        });
    });
});