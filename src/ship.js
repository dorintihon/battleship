class Ship {
    constructor(size){
        this.size = size;
        this.hits = 0;
    }

    getSize(){
        return this.size;
    }

    getHits(){
        return this.hits;
    }

    hit(){
        this.hits++;
    }
    
    isSunk(){
        if(this.hits === this.size){
            return true;
        }

        return false;
    }
}

module.exports = Ship;