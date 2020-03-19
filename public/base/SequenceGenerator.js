// const GameSettings = require('../base/GameSettings').GameSettings;
// const Game = require('../base/Game').Game;
// const Util = require('../ai/Util').Util;
// const NothingAI = require('../ai/NothingAI').NothingAI;

class SequenceGenerator {
    game;

    constructor(game) {
        this.game = game;
    }

    generate() {
        while (!this.game.isFinished()) {
            this.game.update();
        }
        return this.game.displayChangeHistory;
    }
}

// let gameSettings = new GameSettings(10, 10, [new NothingAI("nothing", 0x0000ff)]);
// let gen = new SequenceGenerator(new Game(gameSettings));
// let sequence = gen.generate();
// console.log(JSON.stringify(sequence));

