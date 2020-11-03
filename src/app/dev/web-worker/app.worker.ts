/// <reference lib="webworker" />

import * as WebWorkerConstants from './web-worker.constants';
import { PathNode, RecursionState, WorkerData, WorkerInitData } from './web-worker.model';

addEventListener('message', ({ data }) => {
	const workerData: WorkerData = data as WorkerData;
	switch (workerData.type) {
		case WebWorkerConstants.COMPUTE: {
			const response: WorkerData = {
				type: WebWorkerConstants.WORKER_ALERT,
				payload: {
					workerIndex: workerData.payload.workerIndex,
					infoMessage: 'received data to consume'
				}
			};
			postMessageToTarget(response);
			startMultithreadedComputeProcess(workerData.payload);
			break;
		}
		case WebWorkerConstants.ABORT: {
			const response: WorkerData = {
				type: WebWorkerConstants.WORKER_ALERT,
				payload: {
					workerIndex: workerData.payload.workerIndex,
					infoMessage: 'received abort signal'
				}
			};
			postMessageToTarget(response);
			break;
		}
		default: {
			postMessageToTarget({
				type: WebWorkerConstants.WORKER_ALERT,
				payload: {
					workerIndex: workerData.payload.workerIndex,
					infoMessage: 'No such action defined on worker'
				}
			});
		}
	}
});

function startMultithreadedComputeProcess(dataPayload: WorkerInitData) {
	if (!dataPayload.recursionState || dataPayload.recursionState[0].computing) {
		computeStatefulTestProblem(dataPayload);
	}
	// in progress
	const response: WorkerData = {
		type: WebWorkerConstants.COMPUTE_PROGRESS,
		payload: {
			workerIndex: dataPayload.workerIndex,
			recursionState: dataPayload.recursionState,
			infoMessage: 'solution progress report'
		}
	};
	postMessageToTarget(response);

	// finished all
	if (!dataPayload.recursionState[0].computing) {
		const endResponse: WorkerData = {
			type: WebWorkerConstants.COMPUTE_END,
			payload: {
				workerIndex: dataPayload.workerIndex,
				recursionState: dataPayload.recursionState,
				infoMessage: 'final results returned'
			}
		};
		postMessageToTarget(endResponse);
	} else {
		startMultithreadedComputeProcess(dataPayload);
	}
}

function computeStatefulTestProblem(dataPayload: WorkerInitData) {
	// simple travelling salesman from each depot and select the min

	// init all
	const customerNodes = dataPayload.problemData.customerNodes;
	const depotNodes = dataPayload.problemData.depotNodes;
	const useTimerInterrupt = dataPayload.problemData.useTimerInterrupt;
	const interruptSolutionCount = dataPayload.problemData.interruptSolutionCount;
	const interruptTimeout = dataPayload.problemData.interruptTimeout;
	const visited: boolean[] = [];
	const paths: number[][] = [];
	const customerCount = customerNodes.length;
	const depotCount = depotNodes.length;
	const t1 = new Date().getTime();

	dataPayload.problemData.iteratedSolutionCount = 0;
	let recursionState = dataPayload.recursionState;
	let ti = 0;
	let i = 0;
	let interrupt = false;
	const depth = -1;
	let finalDistance = -1;
	let solutionIndex = -1;
	for (i = 0; i < customerCount; i++) {
		visited.push(false);
	}
	for (i = 0; i < depotCount; i++) {
		paths.push([]);
	}

	// check recursion state and init
	if (!recursionState) {
		recursionState = [];
		for (i = 0; i < customerCount + 1; i++) {
			recursionState.push(null);
		}
		i = 0;
	} else {
		finalDistance = recursionState[depth + 1].currentMinDistance;
		solutionIndex = recursionState[depth + 1].currentMinIndex;
		paths[solutionIndex] = [...recursionState[depth + 1].currentMinPath];
		i = recursionState[depth + 1].currentIndex;

		// reset state to null
		recursionState[depth + 1] = null;
	}

	// do main process (THIS WILL SLIGHTLY CHANGE WITH COMBO OF DEPOT & FIRST CUSTOMER)
	for (i = 0; i < depotCount; i++) {
		const currentPath: PathNode = checkStatefulPath(visited, depotNodes[i], depth + 1, recursionState, t1, dataPayload);

		// select mins
		if (finalDistance === -1) {
			finalDistance = currentPath.pathDistance;
			paths[i] = [...currentPath.pathNodes];
			solutionIndex = i;
		} else if (currentPath.pathDistance < finalDistance) {
			finalDistance = currentPath.pathDistance;
			paths[i] = [...currentPath.pathNodes];
			solutionIndex = i;
		}

		// construct depot recursion state if time interrupt
		ti = new Date().getTime();
		if ((useTimerInterrupt && ti - t1 > interruptTimeout) || dataPayload.problemData.iteratedSolutionCount >= interruptSolutionCount) {
			interrupt = true;
			break;
		}
	}

	// make final state before returning
	recursionState[depth + 1] = {
		computing: interrupt,
		currentIndex: i,
		currentMinIndex: solutionIndex,
		currentMinPath: [...paths[solutionIndex]],
		currentSolutionCount: dataPayload.problemData.totalSolutionCount,
		currentMinDistance: finalDistance,
		currentStartTime: t1,
		lastInterruptTime: interrupt ? ti : null,
		currentEndTime: ti
	};

	// test
	console.log('index ' + dataPayload.workerIndex + ' current state = ', recursionState);

	// final steps after full process
	if (!interrupt) {
		this.shortestDistance = finalDistance;
		this.solutionPath = paths[solutionIndex];
	}

	dataPayload.recursionState = [...recursionState];
}

function checkStatefulPath(
	visitedArray: boolean[],
	selectedNode: number,
	depth: number,
	recursionState: RecursionState[],
	startTime: number,
	dataPayload: WorkerInitData
) {
	// init
	const useTimerInterrupt = dataPayload.problemData.useTimerInterrupt;
	const interruptSolutionCount = dataPayload.problemData.interruptSolutionCount;
	const interruptTimeout = dataPayload.problemData.interruptTimeout;
	const customerCount = dataPayload.problemData.customerNodes.length;
	const paths: number[][] = [];
	let i = 0;
	let ti = 0;
	let interrupt = false;
	let finalDistance = -1;
	let minIndex = -1;
	for (i = 0; i < customerCount; i++) {
		paths.push([]);
	}

	// check recursion state
	if (!recursionState[depth + 1]) {
		i = 0;
	} else {
		finalDistance = recursionState[depth + 1].currentMinDistance;
		minIndex = recursionState[depth + 1].currentMinIndex;
		paths[minIndex] = recursionState[depth + 1].currentMinPath;

		i = recursionState[depth + 1].currentIndex;

		// reset state to null
		recursionState[depth + 1] = null;
	}

	// do main process
	for (; i < customerCount; i++) {
		if (!visitedArray[i]) {
			const newSelectedNode = dataPayload.problemData.customerNodes[i];
			const newVisitedArray = [...visitedArray];
			newVisitedArray[i] = true;
			const currentDistance = dataPayload.problemData.distanceMatrix[selectedNode][newSelectedNode];
			let reqDistance = 0;
			if (depth === customerCount - 1) {
				reqDistance = currentDistance;
				paths[i] = [newSelectedNode, selectedNode];
				dataPayload.problemData.totalSolutionCount++;
				dataPayload.problemData.iteratedSolutionCount++;
			} else {
				const currentPath = checkStatefulPath(newVisitedArray, newSelectedNode, depth + 1, recursionState, startTime, dataPayload);
				reqDistance = currentDistance + currentPath.pathDistance;
				paths[i] = [...currentPath.pathNodes, selectedNode];
			}

			// select mins
			if (finalDistance === -1) {
				finalDistance = reqDistance;
				minIndex = i;
			} else if (reqDistance < finalDistance) {
				finalDistance = reqDistance;
				minIndex = i;
			}

			// construct depot recursion state if time interrupt and not lowest level
			ti = new Date().getTime();
			if (
				depth !== customerCount - 1 &&
				((useTimerInterrupt && ti - startTime > interruptTimeout) ||
					dataPayload.problemData.iteratedSolutionCount >= interruptSolutionCount)
			) {
				interrupt = true;
				break;
			}
		}
	}

	// make final state before returning only if interrupted
	if (interrupt) {
		recursionState[depth + 1] = {
			computing: true,
			currentIndex: i,
			currentMinIndex: minIndex,
			currentMinPath: [...paths[minIndex]],
			currentSolutionCount: dataPayload.problemData.totalSolutionCount,
			currentMinDistance: finalDistance,
			currentStartTime: startTime,
			lastInterruptTime: ti,
			currentEndTime: null
		};
		// if on highest level of recursion
		if (depth === 0) {
			// console.log(this.distanceMatrix, this.distanceMatrix[paths[minIndex][0]][selectedNode]);
			finalDistance += dataPayload.problemData.distanceMatrix[paths[minIndex][0]][selectedNode];
			paths[minIndex].unshift(selectedNode);
			if (recursionState[depth + 1]) {
				recursionState[depth + 1].currentMinPath.unshift(selectedNode);
				recursionState[depth + 1].currentMinDistance = finalDistance;
			}
		}
	}

	// console.log('selected node = ', selectedNode, 'final distance = ', finalDistance, 'depth = ', depth);
	return { pathNodes: paths[minIndex], pathDistance: finalDistance };
}

function postMessageToTarget(resultData: WorkerData) {
	postMessage(resultData);
}

/**
 * added in exclude section of tsconfig.app.json
 * added a tsconfig worker json
 * added tsconfig worker into angular.json
 * FIX THE CODE HERE
 * DEBUG ABORT MECHANISM FOR MULTITHREADED ALGORITHM
 */
