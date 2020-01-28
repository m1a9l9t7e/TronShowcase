class SequenceGenerator {
    grid;
    random_start;

    constructor(players, grid, random_start) {
        this.grid = grid;
        this.random_start = random_start;
        this.players = players;
    }

    generate() {
        let sequence = [];
        let counter = 0;
        while (counter < 4) {
            let moves = [];
            for (let i = 0; i < this.players.length; i++) {
                let player = this.players[i];
                moves.push({player: player, x: counter, y:i});
            }
            sequence.push({step: counter, moves: moves});
            counter++;
        }
        return sequence
    }
}

let gen = new SequenceGenerator(["player1", "player2"]);
let sequence = gen.generate();
console.log(JSON.stringify(sequence));