class Game {
    width;
    height;
    grid;

    gridBehavior;
    startingPositionBehavior;

    players = [];
    counter;

    currentDisplayChange;
    displayChangeHistory;
    userActions = [];

    constructor(gameSettings) {
        this.players = gameSettings.players;
        this.width = gameSettings.width;
        this.height = gameSettings.height;
        this.gridBehavior = gameSettings.gridBehavior;
        this.startingPositionBehavior = gameSettings.startingPositionBehavior;
        this.initialize();
    }

    initialize() {
        this.counter = 0;
        this.currentDisplayChange = [];
        this.displayChangeHistory = [];
        this.grid = this.gridBehavior.generateGrid(this.width, this.height);
        this.drawGrid();
        let startingPositions = this.startingPositionBehavior.generateStartingPositions(this.grid, this.players.length);
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            let startingPosition = startingPositions[i];
            player.initialize(i+1, Util.clone2DArray(this.grid), new Position(startingPosition));
        }
        for (let i = 0; i < this.players.length; i++) {
            this.updateGrid(startingPositions[i], this.players[i].id, this.players[i].color);
        }
        this.pushDisplayChanges();
    }

    drawGrid() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.grid[i][j] !== 0) {
                    this.currentDisplayChange.push({x: i, y: j, value: this.grid[i][j], color: '#000000'});
                }
            }
        }
    }

    update() {
        this.executeUserActions();
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            if (player.alive) {
                player.playerPositions = this.getPlayerPositions();
                let direction = player.calculateNextMove();
                let position = player.position;
                position.move(direction);
                if (Util.checkCoordinates(position.vector, this.grid)) {
                    this.updateGrid(position.vector, player.id, player.color);
                } else {
                    player.alive = false;
                }
            }
        }
        this.pushDisplayChanges();
    }

    updateGrid(c, value, color='#000000') {
        this.grid[c[0]][c[1]] = value;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].grid != null) {
                this.players[i].grid[c[0]][c[1]] = value;
            }
        }
        this.currentDisplayChange.push({x: c[0], y: c[1], value: value, color: color});
    }

    pushDisplayChanges() {
        if (this.currentDisplayChange.length > 0) {
            this.displayChangeHistory.push({step: this.counter++, changes: this.currentDisplayChange});
            this.currentDisplayChange = [];
        }
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
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            if (player.alive) {
                positions.push([player.position.x, player.position.y]);
            } else {
                positions.push(null);
            }
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
