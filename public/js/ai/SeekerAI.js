class SeekerAI extends Player {
    calculateNextMove() {
        let evaluator = new Evaluator();
        evaluator.addCriteria(new MinCriteria(EvalFunctions.shortestPathEval));
        evaluator.addCriteria(new MaxCriteria(EvalFunctions.bfsEval));
        let decision = evaluator.makeDecision(this.position.vector, this.getClosestEnemyPosition(), this.grid);
        return decision;
    }
}