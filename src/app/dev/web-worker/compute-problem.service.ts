export class ComputeProblemService {
	problemSize = 4;

	computeProblem() {
		console.log('...solving for size ' + this.problemSize);
		// some problem
		console.log('...ended');
	}
}

/**
 * The problem must be parallelizable for optimization
 * The problem progress has to be updated on UI - something like how many solutions found
 * It should be heavy enough to block the main thread but workers can take care of it
 */
