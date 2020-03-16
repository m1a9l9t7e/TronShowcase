class Util {
    static xVec = [1, 0, -1, 0];
    static yVec = [0, -1, 0, 1];

    static checkCoordinates(c, grid) {
        let x = c[0];
        let y = c[1];
        return 0 <= x && x < grid[0].length && 0 <= y && y < grid.length && grid[x][y] === 0;
    }

    static getAdjacent(c, grid, include_none = false) {
        let x = c[0];
        let y = c[1];
        let adjacent = [];
        for (let i = 0; i < 4; i++) {
            let adjacent_i = [x + this.xVec[i], y + this.yVec[i]];
            if (this.checkCoordinates(adjacent_i, grid)) {
                adjacent.push(adjacent_i);
            } else if (include_none) {
                adjacent.push(null);
            }
        }
        return adjacent;
    }

    static getDegree(c, grid) {
        return this.getAdjacent(c, grid).length;
    }

    static bfs(c, grid) {
        let bfs_grid = this.clone2DArray(grid);
        let reachable = 0;

        let queue = [c];
        bfs_grid[c[0]][c[1]] = 1;
        while (queue.length !== 0) {
            let pos = queue.shift();
            let adjacent = this.getAdjacent(pos, bfs_grid);

            for (let i = 0; i < adjacent.length; i++) {
                let adjacent_i = adjacent[i];
                queue.push(adjacent_i);
                bfs_grid[adjacent_i[0]][adjacent_i[1]] = Math.max(bfs_grid[pos[0]][pos[1]], 0) + 1;
                reachable++;
            }
        }
        return {bfs_grid: bfs_grid, metric: reachable};
    }

    static shortestPath(c1, c2, grid) {
        let adjacent = this.getAdjacent(c1, grid);
        let distances = [];
        let c2RemovedGrid = this.clone2DArray(grid);
        c2RemovedGrid[c2[0]][c2[1]] = 0;

        for (let i = 0; i < adjacent.length; i++) {
            let bfs_grid = this.bfs(adjacent[i], c2RemovedGrid).bfs_grid;
            let distance = bfs_grid[c2[0]][c2[1]];
            if (distance === 0) {
                adjacent.splice(i, 1);
                i--;
            } else {
                distances.push(distance);
            }
        }

        if (adjacent.length === 0) {
            return {nextStep: null, metric: Number.MAX_SAFE_INTEGER};
        } else {
            return {nextStep: adjacent[this.argmin(distances)], metric: Math.min(...distances)};
        }

    }

    static voronoi(c1, c2, grid) {
        let c1_bfs_grid = this.bfs(c1, grid).bfs_grid;
        let c2_bfs_grid = this.bfs(c2, grid).bfs_grid;
        let voronoi_grid = this.subtract2DArrays(c2_bfs_grid, c1_bfs_grid);
        let influence = voronoi_grid.reduce((counter, x, i, arr) => counter +
            arr[i].reduce((counter, x, i, arr) => x > 0 ? counter + 1 : counter, 0), 0);

        return {voronoi_grid: voronoi_grid, metric: influence}
    }

    static clone2DArray(array) {
        let clone = array.map(function (row) {
            return row.slice();
        });
        return clone;
    }

    static subtract2DArrays(array1, array2) {
        let array_difference = [];
        for (let i = 0; i < array1.length; i++) {
            let row_difference = [];
            for (let j = 0; j < array1[0].length; j++) {
                let element_difference = array1[i][j] - array2[i][j];
                row_difference.push(element_difference);
            }
            array_difference.push(row_difference);
        }
        return array_difference;
    }

    static argmax(array) {
        return array.reduce((MaxIdx, x, i, arr) => x > arr[MaxIdx] ? i : MaxIdx, 0);
    }

    static argmin(array) {
        return array.reduce((MinIdx, x, i, arr) => x < arr[MinIdx] ? i : MinIdx, 0);
    }

    static print2DArray(array) {
        let string = "";
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[0].length; j++) {
                string += array[i][j] + " ";
            }
            string += "\n";
        }
        return string;
    }
}

class EvalFunctions {
    static bfsEval(c1, c2, grid) {
        return Util.bfs(c1, grid).metric;
    }

    static voronoiEval(c1, c2, grid) {
        return Util.voronoi(c1, c2, grid).metric;
    }

    static shortestPathEval(c1, c2, grid) {
        return Util.shortestPath(c1, c2, grid).metric;
    }

    static degreeEval(c1, c2, grid) {
        return Util.getDegree(c1, grid);
    }
}

class Criteria {
    evalFunction;

    constructor(evalFunction) {
        this.evalFunction = evalFunction;
    }

    evaluate(c1, c2, grid, options) {
        let scores = Util.getAdjacent(c1, grid, true).map(x => x == null ? null : this.evalFunction(x, c2, grid));
        return this.evaluateOptions(scores, options)
    }

    evaluateOptions(scores, options) {
        // to be implemented by subclasses
        return null;
    }
}

class MaxCriteria extends Criteria {
    constructor(evalFunction) {
        super(evalFunction);
    }

    evaluateOptions(scores, options) {
        // Set scores to null for excluded options
        scores = scores.map((score, index) => options[index] ? score : null);
        let max = scores.reduce((max, x) => x == null ? max : (x > max ? x : max), 0);
        // Exclude options with smaller than max score
        options = options.map((option, index) => option && scores[index] === max);
        return options;
    }
}

class MinCriteria extends Criteria {
    constructor(evalFunction) {
        super(evalFunction);
    }

    evaluateOptions(scores, options) {
        // Set scores to null for excluded options
        scores = scores.map((score, index) => options[index] ? score : null);
        let min = scores.reduce((min, x) => x == null ? min : (x < min ? x : min), Number.MAX_SAFE_INTEGER);
        // Exclude options with bigger than min score
        options = options.map((option, index) => option && (scores[index] === min));
        return options;
    }
}

class Evaluator {
    criteria = [];

    addCriteria(criteria) {
        this.criteria.push(criteria);
    }

    makeDecision(c1, c2, grid) {
        let options = [true, true, true, true];
        for (let i = 0; i < this.criteria.length; i++) {
            options = this.criteria[i].evaluate(c1, c2, grid, options);
        }

        let decision = null;
        for (let i = 0; i < options.length; i++) {
            if (options[i]) {
                decision = i;
            }
        }

        return decision == null ? 0 : decision;
    }
}

let c1 = [0, 0];
let c2 = [2, 2];
let grid = [[1, 0, 0], [0, 0, 0], [0, 0, 9]];

// Testing
let degree = Util.getDegree(c1, grid);
let adjacent = Util.getAdjacent(c1, grid, true);
let bfs_result = Util.bfs(c1, grid);
let voronoi_result = Util.voronoi(c1, c2, grid);
let shortest_path_result = Util.shortestPath(c1, c2, grid);
let evaluator = new Evaluator();
evaluator.addCriteria(new MaxCriteria(EvalFunctions.voronoiEval));
evaluator.addCriteria(new MinCriteria(EvalFunctions.shortestPathEval));
evaluator.addCriteria(new MaxCriteria(EvalFunctions.bfsEval));
evaluator.addCriteria(new MinCriteria(EvalFunctions.degreeEval));

// console.log(degree);
// console.log(adjacent);
// console.log(bfs_result.bfs_grid);
// console.log(Util.print2DArray(bfs_result.bfs_grid));
// console.log(Util.print2DArray(voronoi_result.voronoi_grid));
// console.log(voronoi_result.metric);
// console.log(shortest_path_result.metric);
// console.log(evaluator.makeDecision(c1, c2, grid));
