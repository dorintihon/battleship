const Ship = require('./ship');

class Gameboard{
    constructor(){
        this.width = 8;
        this.height = 8;
        this.ships = [];
        this.grid = Array.from({ length: this.height }, () =>
        Array.from({ length: this.width }, () => null)
        );

    }

    buildGrid(width, length){
       for(let i = 0; i < width; i++){
            for(let j = 0; j < length; j++){
                this.grid.push([i , j]);
            }
        } 
    };

    placeShip(name, x, y, orientation = 'H'){
        let shipLength;

        if(name === 'smallShip'){
            shipLength = 1;
        }else if(name === 'mediumShip'){
            shipLength = 2;
        }else if(name === 'largeShip'){
            shipLength = 4;
        }else{
            throw new Error("Invalid ship name");
        }

        const ship = new Ship(shipLength);
        const deltas = orientation === 'H' ? [1, 0] : [0, 1];
        const cells = [];

        for (let i = 0; i < shipLength; i++) {
            const cx = x + deltas[0] * i;
            const cy = y + deltas[1] * i;
            if (!this.inBounds(cx, cy)) throw new Error('Out of bounds');
            if (this.grid[cx][cy] !== null) throw new Error('Overlap');
            cells.push([cx, cy]);
        }

        // Commit
        for (const [cx, cy] of cells) {
            this.grid[cx][cy] = ship;
        }
        return ship;
    };

    inBounds(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    receiveAttack(x, y){
        const selectedGrid = this.grid[x][y];
        if(selectedGrid !== null){
            selectedGrid.hit();
            return true;
        }
        this.grid[x][y] = 'miss';
        return false;
    }
}

module.exports = Gameboard;