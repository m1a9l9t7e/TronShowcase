class Command {

    get description() {
        throw new Error('get description() not implemented');
    }

    execute() {
        throw new Error('execute() not implemented');
    }
    undoExecute() {
        throw new Error('undoExecute() not implemented');
    }
}

class RemoveEdgeCommand {
    edgeVisual;

    constructor(edgeVisual) {
        this.edgeVisual = edgeVisual;
    }

    get description() {
        return "Remove Edge " + this.edgeVisual.description;
    }

    execute() {
        this.edgeVisual.fade();
    }

    undoExecute() {
        throw new Error('undoExecute() not implemented');
    }
}
