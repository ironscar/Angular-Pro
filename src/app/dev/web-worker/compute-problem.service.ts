export class ComputeProblemService {
	problemGraph: any;

	initProblemInstance() {
		console.log('...init problem');
	}

	computeProblem() {
		console.log('...solving');
		console.log('...ended');
	}
}

/**
 * The "Vehicle Routing Problem"
 * 		- n depots (some nodes are depots)
 * 		- m1:mn vehicles per depot
 * 		- c customers (some nodes are customers)
 * 		- v nodes on graph where v > (c + n)
 * 		- each edges with some length specifying distance
 * 		- find min distance travelled across all vehicles across all depots
 * To be parallelized and speeded up in background
 * The problem progress has to be updated on UI - something like how many solutions found
 * It should be heavy enough to block the main thread but workers can take care of it
 */
