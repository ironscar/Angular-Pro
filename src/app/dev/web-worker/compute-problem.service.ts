export class ComputeProblemService {
	problemSize: number;
	problemGraph: any;

	depotCount: number;
	vehiclePerDepoCounts: number[] = [];
	customerCount: number;
	nodeCount: number;

	initRandomInstanceOfProblem(size?: number) {
		console.log('set values to counts and init graph');
		this.problemSize = size ? size : 10;

		// basic numbers
		this.depotCount = Math.ceil(Math.random() * (this.problemSize / 2));
		let maxVehicleCount = 0;
		let sumVehicleCount = 0;
		for (let i = 0; i < this.depotCount; i++) {
			let vehicleCount = Math.random() * (this.problemSize / 2) + this.problemSize / 3;
			if (vehicleCount > this.problemSize && this.problemSize > 1) {
				vehicleCount = this.problemSize - 1;
			}
			vehicleCount = Math.ceil(vehicleCount);
			if (vehicleCount > maxVehicleCount) {
				maxVehicleCount = vehicleCount;
			}
			sumVehicleCount += vehicleCount;
			this.vehiclePerDepoCounts.push(vehicleCount);
		}
		this.customerCount = Math.ceil(maxVehicleCount + (sumVehicleCount + maxVehicleCount) / (Math.random() * 3 + 1));
		this.nodeCount = Math.ceil(Math.random() * 2) * this.customerCount + maxVehicleCount;

		console.log(
			'problem size ',
			this.problemSize,
			'\nDepot count ',
			this.depotCount,
			'\nVehicle counts ',
			this.vehiclePerDepoCounts,
			'\nCustomer count ',
			this.customerCount,
			'\nNode count ',
			this.nodeCount
		);

		/**
		 * set up graph specifying which node is customer,
		 * which edge has what length and connects which nodes and allows what directions
		 * which node is depot and how many vehicles that depot has
		 * make sure the graph is connected overall
		 */
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
