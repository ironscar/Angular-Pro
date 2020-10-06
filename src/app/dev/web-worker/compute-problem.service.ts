import { PathNode } from './web-worker.model';

export class ComputeProblemService {
	problemGraph: number[][];
	depotNodes: number[];
	depotVehicles: number[];
	customerNodes: number[];

	distanceMatrix: number[][];
	solutionPath: number[];
	shortestDistance: number;

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
		const nodeCount = 80;
		const maxPathCost = 40;
		for (let i = 0; i < nodeCount; i++) {
			const row = [];
			for (let j = 0; j < nodeCount; j++) {
				if (i === j) {
					row.push(0);
				} else {
					const value = Math.ceil(Math.random() * (maxPathCost - 1) + 1);
					row.push(value < 10 ? null : value);
				}
			}
			this.problemGraph.push(row);
		}
		// console.log('the graph ', this.problemGraph);

		// init 2 depot nodes each with 1 to 3 vehicles each and 10 customer nodes
		const depotCount = 3;
		const customerCount = 11;
		const maxVehicleCount = 4;

		// init depot nodes somewhere in the middle
		const start = Math.floor(nodeCount / 3);
		const end = Math.floor((2 * nodeCount) / 3);
		const separator = 4;
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
		// console.log('depots ', this.depotNodes);

		// init vehicles per depo with total vehicles less than depotCount * maxVehicleCount
		for (let i = 0; i < depotCount; i++) {
			const value = Math.random() * (maxVehicleCount - 1) + 1;
			if (i % 2 === 0) {
				this.depotVehicles.push(Math.ceil(value));
			} else {
				this.depotVehicles.push(Math.floor(value));
			}
		}
		// console.log('depot vehicles ', this.depotVehicles);

		// init customer nodes everywhere else
		count = 0;
		let firstHit = false;
		for (let i = 1; i < nodeCount; i += separator) {
			if (i >= start && !firstHit) {
				i = end;
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
		// console.log('customers ', this.customerNodes);

		console.log('problem instance created');
	}

	initTestProblemInstance() {
		// reset problem
		this.problemGraph = [];
		this.depotNodes = [];
		this.depotVehicles = [];
		this.customerNodes = [];

		// init graph
		this.problemGraph.push([0, 4, null, 3, null]);
		this.problemGraph.push([4, 0, 3, 2, 5]);
		this.problemGraph.push([null, 3, 0, null, null]);
		this.problemGraph.push([3, 2, null, 0, 7]);
		this.problemGraph.push([null, 5, null, 7, 0]);

		// init depot nodes (1 depot with 1 vehicle => travelling salesman)
		this.depotNodes.push(0);
		this.depotVehicles.push(1);

		// init customer nodes
		this.customerNodes.push(1);
		this.customerNodes.push(2);
		this.customerNodes.push(3);
		this.customerNodes.push(4);

		// console.log('graph ', this.problemGraph);
		// console.log('depots ', this.depotNodes);
		// console.log('customers ', this.customerNodes);
	}

	computeTestProblem() {
		// simple travelling salesman from each depot and select the min
		let finalDistance = -1;
		this.distanceMatrix = [];
		this.solutionPath = [];
		this.shortestDistance = 0;

		this.computeAllDistances();

		const visited: boolean[] = [];
		const customerCount = this.customerNodes.length;
		for (let i = 0; i < customerCount; i++) {
			visited.push(false);
		}
		const depotCount = this.depotNodes.length;
		let solutionIndex = 0;
		const paths: number[][] = [];
		for (let i = 0; i < depotCount; i++) {
			paths.push([]);
			const currentPath: PathNode = this.checkPath(visited, this.depotNodes[i]);
			if (finalDistance === -1) {
				finalDistance = currentPath.pathDistance;
				paths[i] = [...currentPath.pathNodes];
				solutionIndex = i;
			} else if (currentPath.pathDistance < finalDistance) {
				finalDistance = currentPath.pathDistance;
				paths[i] = [...currentPath.pathNodes];
				solutionIndex = i;
			}
		}
		this.shortestDistance = finalDistance;
		this.solutionPath = paths[solutionIndex];

		// remind problem
		console.clear();
		console.log('graph is ', this.problemGraph);
		console.log('depots are ', this.depotNodes);
		console.log('customers are ', this.customerNodes);
		console.log('path is ', this.solutionPath.join('<-'));
		console.log('shortest distance is ', finalDistance);

		return finalDistance;
	}

	checkPath(visitedArray: boolean[], selectedNode: number, depth: number = 0): PathNode {
		const customerCount = this.customerNodes.length;
		let finalDistance = -1;
		let minIndex = -1;
		const paths: number[][] = [];
		for (let i = 0; i < customerCount; i++) {
			paths.push([]);
			if (!visitedArray[i]) {
				const newSelectedNode = this.customerNodes[i];
				const newVisitedArray = [...visitedArray];
				newVisitedArray[i] = true;
				const currentDistance = this.distanceMatrix[selectedNode][newSelectedNode];
				let reqDistance = 0;
				if (depth === customerCount - 1) {
					reqDistance = currentDistance;
					paths[i] = [newSelectedNode, selectedNode];
				} else {
					const currentPath = this.checkPath(newVisitedArray, newSelectedNode, depth + 1);
					reqDistance = currentDistance + currentPath.pathDistance;
					paths[i] = [...currentPath.pathNodes, selectedNode];
				}
				if (finalDistance === -1) {
					finalDistance = reqDistance;
					minIndex = i;
				} else if (reqDistance < finalDistance) {
					finalDistance = reqDistance;
					minIndex = i;
				}
			}
		}
		if (depth === 0) {
			// console.log(this.distanceMatrix, this.distanceMatrix[paths[minIndex][0]][selectedNode]);
			finalDistance += this.distanceMatrix[paths[minIndex][0]][selectedNode];
			paths[minIndex].unshift(selectedNode);
		}
		// console.log('selected node = ', selectedNode, 'final distance = ', finalDistance, 'depth = ', depth);
		return { pathNodes: paths[minIndex], pathDistance: finalDistance };
	}

	computeAllDistances() {
		// all distances between all nodes
		const nodeCount = this.problemGraph.length;
		for (let i = 0; i < nodeCount; i++) {
			const distanceRow = [];
			const visited = [];
			let currentNode = i;

			// init
			for (let j = 0; j < nodeCount; j++) {
				visited.push(false);
				distanceRow.push(null);
			}

			// dijkstra
			distanceRow[currentNode] = 0;
			for (let k = 0; k < nodeCount - 1; k++) {
				let minValue = -1;
				let minpos = -1;
				for (let j = 0; j < nodeCount; j++) {
					if (!visited[j]) {
						const connection = this.problemGraph[currentNode][j];
						if (i !== j) {
							if (connection !== null) {
								const value = connection + distanceRow[currentNode];
								if (distanceRow[j] === null) {
									distanceRow[j] = value;
								} else {
									distanceRow[j] = Math.min(distanceRow[j], value);
								}
							}
							if (distanceRow[j] !== 0 && distanceRow[j] !== null) {
								if (minValue === -1) {
									minValue = distanceRow[j];
									minpos = j;
								} else if (distanceRow[j] < minValue) {
									minValue = distanceRow[j];
									minpos = j;
								}
							}
						}
					}
				}
				currentNode = minpos;
				visited[minpos] = true;
			}
			this.distanceMatrix.push(distanceRow);
		}
		console.log('distance computed ', this.distanceMatrix);
	}
}

/**
 * The "Vehicle Routing Problem"
 * Simplified to just solve the travelling salesman
 * To be parallelized and speeded up in background
 * The problem progress has to be updated on UI - something like how many solutions found
 * It should be heavy enough to block the main thread but workers can take care of it
 */
