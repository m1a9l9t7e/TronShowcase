class Player {
    name;
    id;
    color;

    alive;
    position;
    grid;

    constructor(name, color) {
        this.name = name;
        this.id = id;
        this.color = color;
    }

    initialize(id, grid, position) {
        this.id = id;
        this.grid = grid;
        this.position = position;
    }

    calculateNextMove() {
        throw 'This is an abstract method that needs to be implemented by a subclass';
    }

    getPlayerPositions() {

    }

    getClosestEnemyPosition() {
        let allPlayerPositions = this.getPlayerPositions();
        let position = this.position.vector;
        let minDistance = Number.MAX_SAFE_INTEGER;
        let minDistanceId = -1;
        for (let i = 0; i < allPlayerPositions.length; i++) {
            if ((i + 1) === this.id) {
                continue;
            }
            let distance = Util.shortestPath(position, allPlayerPositions[i], this.grid).metric;
            if (distance < minDistance) {
                minDistance = distance;
                minDistanceId = i;
            }
        }
        if (minDistance === -1) {
            // Player is alone
            return [0, 0]
        } else {
            return allPlayerPositions[minDistanceId];
        }
    }
}
