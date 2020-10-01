export class ComputeProblemService {
	problemGraph: number[][];
	depotNodes: number[];
	depotVehicles: number[];
	customerNodes: number[];

	initProblemInstance() {
		console.log('...init problem');

		/**
		 * make sure to only change constants if you are very sure
		 * total vehicles must be lesser than total customers
		 */

		// reset problem
		this.problemGraph = [];
		this.depotNodes = [];
		this.depotVehicles = [];
		this.customerNodes = [];

		// init graph and try to make it about 40% sparse by adding zeros for diagnals and distance < 4
		const nodeCount = 24;
		const maxPathCost = 10;
		for (let i = 0; i < nodeCount; i++) {
			const row = [];
			for (let j = 0; j < nodeCount; j++) {
				if (i === j) {
					row.push(0);
				} else {
					const value = Math.ceil(Math.random() * (maxPathCost - 1) + 1);
					row.push(value < 4 ? 0 : value);
				}
			}
			this.problemGraph.push(row);
		}
		console.log('the graph ', this.problemGraph);

		// init 2 depot nodes each with 1 to 3 vehicles each and 10 customer nodes
		const depotCount = 2;
		const customerCount = 9;
		const maxVehicleCount = 3;

		// init depot nodes somewhere in the middle
		const start = nodeCount / 3;
		const end = (2 * nodeCount) / 3;
		const separator = 2;
		let count = 0;
		for (let i = start; i < end; i += separator) {
			if (count < depotCount && i !== start && i !== end) {
				this.depotNodes.push(i);
				count++;
			}
			if (count === depotCount) {
				break;
			}
		}
		console.log('depots ', this.depotNodes);

		// init vehicles per depo with total vehicles less than depotCount * maxVehicleCount
		for (let i = 0; i < depotCount; i++) {
			const value = Math.random() * (maxVehicleCount - 1) + 1;
			if (i % 2 === 0) {
				this.depotVehicles.push(Math.ceil(value));
			} else {
				this.depotVehicles.push(Math.floor(value));
			}
		}
		console.log('depot vehicles ', this.depotVehicles);

		// init customer nodes everywhere else
		count = 0;
		let firstHit = false;
		for (let i = 1; i < nodeCount; i += separator) {
			if (i >= nodeCount / 3 && !firstHit) {
				i = (2 * nodeCount) / 3;
				firstHit = true;
			}
			if (count < customerCount) {
				this.customerNodes.push(i);
				count++;
			}
			if (count === customerCount) {
				break;
			}
		}
		console.log('customers ', this.customerNodes);

		console.log('problem instance created');
	}

	computeProblem() {
		console.log('...solving');
		console.log('...ended');
	}
}

/**
 * The "Vehicle Routing Problem"
 * To be parallelized and speeded up in background
 * The problem progress has to be updated on UI - something like how many solutions found
 * It should be heavy enough to block the main thread but workers can take care of it
 */
