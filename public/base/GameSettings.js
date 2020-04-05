class GameSettings {
    players = [];
    width;
    height;
    gridDecorator;
    startingPositionBehavior;

    constructor(width, height, players, gridDecorator=null, startingPositionBehavior=null) {
        this.width = width;
        this.height = height;
        this.players = players;
        this.gridDecorator = (gridDecorator == null ? new EmptyGrid() : gridDecorator);
        this.startingPositionBehavior = (startingPositionBehavior == null ? new FairMirrored() : startingPositionBehavior);
    }
}
