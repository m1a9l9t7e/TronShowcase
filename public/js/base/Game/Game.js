class Game {
    width;
    height;
    players = [];
    lastPlayerTimeout;

    grid;
    gridDecorator;
    startingPositionBehavior;

    counter;
    timeoutCounter;
    finished;

    currentDisplayChange;
    displayChangeHistory;
    userActions = [];

    constructor(gameSettings) {
        this.players = gameSettings.players;
        this.width = gameSettings.width;
        this.height = gameSettings.height;
        this.lastPlayerTimeout = gameSettings.lastPlayerTimeout;
        this.gridDecorator = gameSettings.gridDecorator;
        this.startingPositionBehavior = gameSettings.startingPositionBehavior;
    }

    initialize() {
        this.counter = 0;
        this.finished = false;
        this.timeoutCounter = this.lastPlayerTimeout;
        this.currentDisplayChange = [];
        this.displayChangeHistory = [];
        this.grid = this.initializeEmptyGrid(this.width, this.height);
        this.grid = this.gridDecorator.decorate(this.grid);
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
        let numPlayersAlive = 0;
        // perform user action
        this.executeUserActions();

        // perform ai action
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            if (player.alive) {
                player.playerPositions = this.getPlayerPositions();
                let direction = player.calculateNextMove();
                let position = player.position;
                position.move(direction);
                if (Util.checkCoordinates(position.vector, this.grid)) {
                    this.updateGrid(position.vector, player.id, player.color);
                    numPlayersAlive += 1;
                } else {
                    player.alive = false;
                }
            }
        }
        this.pushDisplayChanges();

        // check finish condition
        if (numPlayersAlive === 1) {
            if (this.timeoutCounter === 0) {
                this.finished = true;
            } else {
                this.timeoutCounter -= 1;
            }
        }  else if (numPlayersAlive < 1) {
            this.finished = true;
        }
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
        return this.finished;
    }
}
