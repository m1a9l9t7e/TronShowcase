class Util {
    xVec = [1, 0, -1, 0];
    yVec = [0, -1, 0, 1];

    checkCoordinates(c, grid) {
        let x = c[0];
        let y = c[1];
        return 0 <= x && x < grid[0].length && 0 <= y && y < grid.length && grid[x][y] === 0;
    }

    getAdjacent(c, grid) {
        let x = c[0];
        let y = c[0];
        let adjacent = [];
        for (let i = 0; i < 4; i++) {
            let adjacent_i = [x + this.xVec[i], y + this.yVec[i]];
            if (this.checkCoordinates(adjacent_i, grid)) {
                adjacent.push(adjacent_i);
            }
        }
        return adjacent;
    }

    getDegree(c, grid) {
        return this.getAdjacent(c, grid).length;
    }

    bfs(c, grid) {
        let bfs_grid = this.clone2DArray(grid);
        let reachable = 0;

        let queue = [c];
        while (queue.length !== 0) {
            let pos = queue.shift();
            let adjacent = this.getAdjacent(pos, bfs_grid);
            for (let i = 0; i < adjacent.length; i++) {
                let adjacent_i = adjacent[i];
                queue.push(adjacent_i);
                bfs_grid[adjacent_i[0]][adjacent_i[1]] = bfs_grid[pos[0]][pos[1]] + 1;
                reachable++;
            }
        }
        return {bfs_grid: bfs_grid, metric: reachable};
    }

    shortestPath(c1, c2, grid) {
        let adjacent = this.getAdjacent(c1, grid);
        let distances = [];

        for (let i = 0; i < adjacent.length; i++) {
            let bfs_grid = this.bfs(c1, grid).bfs_grid;
            let distance = bfs_grid[c2[0]][c2[1]];
            if (distance === 0) {
                adjacent.splice(i, 1);
                i--;
            } else {
                distances.push();
            }
        }

        if (adjacent.length === 0) {
            return null;
        } else {
            return adjacent[this.argmin(distances)];
        }
    }

    voronoi(c1, c2, grid) {
        let c1_bfs_grid = this.bfs(c1, grid).bfs_grid;
        let c2_bfs_grid = this.bfs(c2, grid).bfs_grid;
        let voronoi_grid = this.subtract2DArrays(c1_bfs_grid, c2_bfs_grid);
        let influence = voronoi_grid.reduce((counter, x, i, arr) => counter +
            arr[i].reduce((counter, x, i, arr) => x > 0 ? counter + 1 : counter, 0), 0);

        return {voronoi_grid: voronoi_grid, metric: influence}
    }

    clone2DArray(array) {
        let clone = array.map(function(row) {
            return row.slice();
        });
        return clone;
    }

    subtract2DArrays(array1, array2) {
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

    argmax(array) {
        return array.reduce((MaxIdx, x, i, arr) => x > arr[MaxIdx] ? i : MaxIdx, 0);
    }

    argmin(array) {
        return array.reduce((MinIdx, x, i, arr) => x < arr[MinIdx] ? i : MinIdx, Number.MAX_SAFE_INTEGER);
    }
}