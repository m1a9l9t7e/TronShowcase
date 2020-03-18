class SequenceGenerator {
    game;

    constructor(game) {
        this.game = game;
    }

    generate() {
        let sequence = [];
        let counter = 0;
        while (!game.isFinished()) {
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
// console.log(JSON.stringify(sequence));
