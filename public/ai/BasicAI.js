class BasicAI extends Player {
    calculateNextMove() {
        let evaluator = new ListAllEvaluator();
        evaluator.addCriteria(new MaxCriteria(EvalFunctions.noEval));
        let validDecisions = evaluator.makeDecision(this.position.vector, [0, 0], this.grid);

        let wallAhead = true;
        for (let i = 0; i < validDecisions.length; i++) {
            if (this.position.direction === validDecisions[i]) {
                wallAhead = false;
            }
        }

        if (wallAhead) {
            let randomEvaluator = new RandomEvaluator();
            randomEvaluator.addCriteria(new MaxCriteria(EvalFunctions.noEval));
            return randomEvaluator.makeDecision(this.position.vector, [0, 0], this.grid);
        } else {
            return this.position.direction;
        }
    }
}
