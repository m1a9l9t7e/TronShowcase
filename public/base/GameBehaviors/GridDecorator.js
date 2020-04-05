class GridDecorator {
    delegate;

    constructor(delegate=null) {
        this.delegate = delegate;
    }

    decorate(grid) {
        if (this.delegate !== null) {
            grid = this.delegate.decorate(grid);
        }
        return this.changeGrid(grid);
    }

    changeGrid(grid) {
        throw "Must be implemented by subclass";
    }
}

class NullDecorator extends GridDecorator {
    changeGrid(grid) {
        return grid;
    }
}

class MirrorYDecorator extends GridDecorator {
    changeGrid(grid) {
        // mirror grid along Y axis
        return grid;
    }
}


class MirrorXDecorator extends GridDecorator {
    changeGrid(grid) {
        // mirror grid along X axis
        return grid;
    }
}

class RectangularObstaclesDecorator extends GridDecorator {
    numObstacles;

    constructor(delegate, numObstacles) {
        super(delegate);
        this.numObstacles = numObstacles;
    }

    changeGrid(grid) {
        let numObstacles = this.numObstacles;
        let width = grid.length;
        let height = grid[0].length;
        while (numObstacles > 1) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            let rectWidth = Math.min(Math.min(Math.floor(Math.random() * numObstacles), width - x), Math.floor(width/2));
            let rectHeight = Math.min(Math.min(Math.ceil(Math.random() * Math.floor(numObstacles / rectWidth)), height - y), Math.floor(height/2));
            numObstacles -= (rectWidth * rectHeight);
            for (let i = 0; i < rectWidth; i++) {
                for (let j = 0; j < rectHeight; j++) {
                    grid[x+i][y+j] = 1;
                }
            }
        }
        return grid;
    }
}

class RandomObstaclesDecorator extends GridDecorator {
    numObstacles;

    constructor(delegate, numObstacles) {
        super(delegate);
        this.numObstacles = numObstacles;
    }

    changeGrid(grid) {
        let numObstacles = this.numObstacles;
        let width = grid.length;
        let height = grid[0].length;
        while (numObstacles > 0) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            numObstacles -= 1;
            grid[x][y] = 1;
        }
        return grid;
    }
}
