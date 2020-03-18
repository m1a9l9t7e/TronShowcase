class SpaceLovingAI extends Player {
    calculateNextMove() {
        evaluator.addCriteria(new MaxCriteria(EvalFunctions.bfsEval));
        let decision = evaluator.makeDecision(this.position.vector, this.getClosestEnemyPosition(), this.grid);
        return decision;
    }
}
