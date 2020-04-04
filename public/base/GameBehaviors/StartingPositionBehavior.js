class StartingPositionBehavior {
    maxTimeout = 500;

    generateStartingPositions() {
        throw "must be implemented by subclass";
    }
}

class FairMirrored extends StartingPositionBehavior {

    generateStartingPositions(grid, numPlayers) {
        let counter = 0;
        let width = grid.length;
        let height = grid[0].length;
        let startingPositions = [];
        if (numPlayers === 1 || numPlayers === 2) {
            while (true) {
                let x = Math.floor(Math.random() * width);
                let y = Math.floor(Math.random() * height);
                if (Util.checkCoordinates([x, y], grid)) {
                    startingPositions.push([x, y]);
                    break;
                }
                if (counter++ > this.maxTimeout) {
                    throw "Could not find starting position.";
                }
            }
            if (numPlayers === 2) {
                let x2 = width - x;
                let y2 = height - y;
                if (Util.checkCoordinates([x2, y2], grid)) {
                    startingPositions.push([x2, y2]);
                } else {
                    startingPositions.push([x2 + ((width + 1) % 2), y2 + ((height + 1) % 2)])
                }
            }
        } else {
            for (let i = 0; i < numPlayers; i++) {
                while (true) {
                    let x = Math.floor(Math.random() * width);
                    let y = Math.floor(Math.random() * height);
                    if (Util.checkCoordinates([x, y], grid)) {
                        startingPositions.push([x, y]);
                        break;
                    }
                    if (counter++ > this.maxTimeout) {
                        throw "Could not find starting position.";
                    }
                }
            }
        }
        return startingPositions
    }
}
