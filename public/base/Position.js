class Position {
    x;
    y;

    /**
     * 0 right, 1 up, 2 left, 3 down
     */
    direction;
    xVec = [1, 0, -1, 0];
    yVec = [0, -1, 0, 1];

    constructor(c) {
        this.x = c[0];
        this.y = c[1];
        this.direction = 0;
    }

    move(direction) {
        this.x += this.xVec[direction];
        this.y += this.yVec[direction];
    }

    set direction(direction) {
        this.direction = direction;
    }

    get vector() {
        return [this.x, this.y];
    }
}

