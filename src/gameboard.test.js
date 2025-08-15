const Gameboard = require('./gameboard');

describe('Gameboard', () => {
    test('creates a Gameboard instance', () => {
        const board = new Gameboard();
        expect(board).toBeInstanceOf(Gameboard);
        expect(typeof board).toBe('object');
    });

    
});