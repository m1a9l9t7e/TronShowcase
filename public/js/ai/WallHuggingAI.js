class WallHuggingAI extends Player {
    calculateNextMove() {
        let evaluator = new Evaluator();
        evaluator.addCriteria(new MinCriteria(EvalFunctions.degreeEval));
        let decision = evaluator.makeDecision(this.position.vector, [0, 0], this.grid);
        return decision;
    }
}