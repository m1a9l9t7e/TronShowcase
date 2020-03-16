class Position {
    x;
    y;

    /**
     * 0 right, 1 up, 2 left, 3 down
     */
    direction;
    xVec = [1, 0, -1, 0];
    yVec = [0, -1, 0, 1];

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.direction = 0;
    }

    move() {
        this.x += this.xVec[this.direction];
        this.y += this.yVec[this.direction];
    }

    set direction(direction) {
        this.direction = direction;
    }

}