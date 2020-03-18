class SeekerAI extends Player {
    calculateNextMove() {
        evaluator.addCriteria(new MinCriteria(EvalFunctions.shortestPathEval));
        let decision = evaluator.makeDecision(this.position.vector, this.getClosestEnemyPosition(), this.grid);
        return decision;
    }
}
