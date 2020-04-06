class SpaceWallLovingAI extends Player {
    calculateNextMove() {
        let evaluator = new Evaluator();
        evaluator.addCriteria(new MaxCriteria(EvalFunctions.bfsEval));
        evaluator.addCriteria(new MinCriteria(EvalFunctions.degreeEval));
        let decision = evaluator.makeDecision(this.position.vector, [0, 0], this.grid);
        return decision;
    }
}