class SpaceLovingAI extends Player {
    calculateNextMove() {
        let evaluator = new Evaluator();
        evaluator.addCriteria(new MaxCriteria(EvalFunctions.bfsEval));
        let decision = evaluator.makeDecision(this.position.vector, [0, 0], this.grid);
        return decision;
    }
}