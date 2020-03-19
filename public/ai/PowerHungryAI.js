class PowerHungryAI extends Player {
    calculateNextMove() {
        let evaluator = new Evaluator();
        evaluator.addCriteria(new MaxCriteria(EvalFunctions.bfsEval));
        evaluator.addCriteria(new MaxCriteria(EvalFunctions.voronoiEval));
        evaluator.addCriteria(new MinCriteria(EvalFunctions.degreeEval));
        let decision = evaluator.makeDecision(this.position.vector, this.getClosestEnemyPosition(), this.grid);
        return decision;
    }
}