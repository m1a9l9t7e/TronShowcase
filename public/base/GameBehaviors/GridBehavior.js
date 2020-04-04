class GridBehavior {

    generateGrid(width, height) {
        let grid = this.initializeEmptyGrid(width, height);
        grid = this.addObstacles(grid);
        return grid;
    }

    initializeEmptyGrid(width, height) {
        let grid = [];
        for (let i = 0; i < width; i++) {
            let row = [];
            for (let j = 0; j < height; j++) {
                row.push(0);
            }
            grid.push(row);
        }
        return grid;
    }

    addObstacles(grid) {
        throw "must be implemented by subclass";
    }
}

class EmptyGrid extends GridBehavior {

    addObstacles(grid) {
        return grid;
    }
}

class RectangularObstaclesGrid extends GridBehavior {
    numObstacles;

    constructor(numObstacles) {
        super();
        this.numObstacles = numObstacles;
    }

    addObstacles(grid) {
        console.log("Adding Rectangular obstacles:");
        let numObstacles = this.numObstacles;
        let width = grid.length;
        let height = grid[0].length;
        console.log("info about grid:");
        console.log("width: " + width);
        console.log("height: " + height);
        console.log("number of walls to construct obstacles out of: " + numObstacles);
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
            console.log("Rectangle: " + x + "|" + y + ", (" + rectWidth + "|"+ rectHeight+ ")")
        }
        console.log(Util.print2DArray(grid));
        return grid;
    }
}
