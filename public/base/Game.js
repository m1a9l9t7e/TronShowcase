class Game {
    players = [];
    ups;

    width;
    height;
    grid;

    constructor(gameSettings) {
        this.players = gameSettings.players;
        this.width = gameSettings.width;
        this.height = gameSettings.height;
    }

    init() {
        let starting_positions = null;
        for (let i = 0; i < players.length; i++) {

        }
    }

    generateGrid() {

    }

    generateStartingPositions() {

    }

    update() {

    }


    getPlayerPositions() {
        let positions = [];
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            positions.push(player.position)
        }
        return positions;
    }
}