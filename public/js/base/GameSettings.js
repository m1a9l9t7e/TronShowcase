class GameSettings {
    players = [];
    width;
    height;
    lastPlayerTimeout;
    gridDecorator;
    startingPositionBehavior;

    constructor(width, height, players, lastPlayerTimeout=-1, gridDecorator=null, startingPositionBehavior=null) {
        this.width = width;
        this.height = height;
        this.players = players;
        this.lastPlayerTimeout = lastPlayerTimeout;
        this.gridDecorator = (gridDecorator == null ? new NullDecorator() : gridDecorator);
        this.startingPositionBehavior = (startingPositionBehavior == null ? new FairMirrored() : startingPositionBehavior);
    }
}
