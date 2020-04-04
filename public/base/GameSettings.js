class GameSettings {
    players = [];
    width;
    height;
    gridBehavior;
    startingPositionBehavior;

    constructor(width, height, players, gridBehavior=null, startingPositionBehavior=null) {
        this.width = width;
        this.height = height;
        this.players = players;
        this.gridBehavior = (gridBehavior == null ? new EmptyGrid() : gridBehavior);
        this.startingPositionBehavior = (startingPositionBehavior == null ? new FairMirrored() : startingPositionBehavior);
    }
}
