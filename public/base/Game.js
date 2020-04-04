class Game {
    players = [];
    counter;

    width;
    height;
    grid;

    currentDisplayChange;
    displayChangeHistory;
    userActions = [];

    constructor(gameSettings) {
        this.players = gameSettings.players;
        this.width = gameSettings.width;
        this.height = gameSettings.height;
        this.initialize();
    }

    initialize() {
        this.counter = 0;
        this.currentDisplayChange = [];
        this.displayChangeHistory = [];
        this.grid = this.generateGrid();
        let startingPositions = this.generateStartingPositions();
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

    generateGrid() {
        let grid = [];
        for (let i = 0; i < this.width; i++) {
            let row = [];
            for (let j = 0; j < this.height; j++) {
                row.push(0);
            }
            grid.push(row);
        }
        return grid;
    }

    generateStartingPositions() {
        let width = this.width - 1;
        let height = this.height - 1;
        let startingPositions = [];
        if (this.players.length === 1) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            startingPositions.push([x, y])
        } else if (this.players.length === 2) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            startingPositions.push([x, y]);
            this.updateGrid([x, y], 1);
            let x2 = width - x;
            let y2 = height - y;
            if (Util.checkCoordinates([x2, y2], this.grid)) {
                startingPositions.push([x2, y2]);
            } else {
                startingPositions.push([x2 + ((this.width +1) % 2), y2 + ((this.height +1) % 2)])
            }
        } else {
            for (let i = 0; i < this.players.length; i++) {
                while (true) {
                    let x = Math.floor(Math.random() * width);
                    let y = Math.floor(Math.random() * height);
                    if (Util.checkCoordinates([x, y], this.grid)) {
                        startingPositions.push([x, y]);
                        this.updateGrid([x, y], 1);
                        break;
                    }
                }
            }
        }
        return startingPositions
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
