class Player {
    name;
    id;
    color;

    alive;
    position;
    grid;
    playerPositions;

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    initialize(id, grid, position) {
        this.id = id;
        this.grid = grid;
        this.position = position;
        this.alive = true;
    }

    calculateNextMove() {
        throw 'This is an abstract method that needs to be implemented by a subclass';
    }

    getPlayerPositions() {
        return this.playerPositions;
    }

    getClosestEnemyPosition() {
        let allPlayerPositions = this.getPlayerPositions();
        let position = this.position.vector;
        let minDistance = Number.MAX_SAFE_INTEGER;
        let minDistanceId = -1;
        for (let i = 0; i < allPlayerPositions.length; i++) {
            if ((i + 1) === this.id || allPlayerPositions[i] == null) {
                continue;
            }
            let distance = Util.shortestPath(position, allPlayerPositions[i], this.grid).metric;
            if (distance < minDistance) {
                minDistance = distance;
                minDistanceId = i;
            }
        }
        if (minDistanceId === -1) {
            // Player is alone
            return null;
        } else {
            return allPlayerPositions[minDistanceId];
        }
    }
}
