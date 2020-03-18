class Game {
    players = [];
    ups;
    counter;

    width;
    height;
    grid;

    userActions = [];
    currentDisplayChange = [];
    displayChangeHistory = [];

    constructor(gameSettings) {
        this.players = gameSettings.players;
        this.width = gameSettings.width;
        this.height = gameSettings.height;
    }

    initialize() {
        this.grid = this.generateGrid();
        let startingPositions = this.generateStartingPositions();
        for (let i = 0; i < this.players.length; i++) {
            let player = players[i];
            let startingPosition = startingPositions[i];
            player.initialize(i+1, Util.clone2DArray(this.grid), new Position(startingPosition));
        }
        for (let i = 0; i < this.players.length; i++) {
            this.updateGrid(startingPositions[i], players[i].id);
        }
        this.pushDisplayChanges();
    }

    generateGrid() {
        let grid = [];
        for (let i = 0; i < this.width; i++) {
            let row = [];
            for (let j = 0; j < this.height; j++) {
                row.push(0);
            }
            grid.push(row);
        }
    }

    generateStartingPositions() {
        let starting_positions = null;
        for (let i = 0; i < players.length; i++) {

        }
    }

    update() {
        this.executeUserActions();
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            if (player.alive) {
                player.calculateNextMove();
                let position = player.position;
                position.move();
                if (Util.checkCoordinates(position.vector, this.grid)) {
                    this.updateGrid(position.vector, player.id);
                } else {
                    player.alive = false;
                }
            }
        }
        this.pushDisplayChanges();
    }

    updateGrid(c, value) {
        this.grid[c[0]][c[1]] = value;
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].grid[c[0]][c[1]] = value;
        }
        this.currentDisplayChange.push({x: c[0], y: c[1], value: value})
    }

    pushDisplayChanges() {
        this.displayChangeHistory.push({step: this.counter++, changes: this.currentDisplayChange});
        this.currentDisplayChange = [];
    }

    executeUserActions() {
        let numUserActions = this.userActions.length;
        for (let i = 0; i < numUserActions; i++) {
            let c = this.userActions.shift();
            if (this.grid[c[0]][c[1]] === 0) {
                this.updateGrid(c, 1);
            } else if (this.grid[c[0]][c[1]] === 1) {
                this.updateGrid(c, 0);
            } else {
                this.updateGrid(c, this.grid[c[0]][c[1]]);
            }
        }
    }

    getPlayerPositions() {
        let positions = [];
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            positions.push(player.position)
        }
        return positions;
    }

    getPlayerById(id) {
        for (let i = 0; i < this.players.length; i++) {
            if (id === this.players[i].id) {
                return this.players[i];
            }
        }
        return null;
    }

    onUserClickedGrid(c) {
        this.userActions.push(c);
    }

    isFinished() {
        let playerAlive = false;
        for (let i = 0; i < this.players.length; i++) {
            playerAlive = playerAlive || this.players[i].alive;
        }
        return !playerAlive;
    }
}
