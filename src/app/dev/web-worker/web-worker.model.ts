export interface WorkerData {
	type: string;
	payload: WorkerInitData;
}

export interface PathNode {
	pathNodes: number[];
	pathDistance: number;
}

export interface RecursionState {
	computing: boolean;
	currentIndex: number;
	currentMinDistance: number;
	currentMinIndex: number;
	currentMinPath: number[];
	currentSolutionCount: number;
	currentStartTime: number;
	lastInterruptTime: number;
	currentEndTime: number;
}

export interface WorkerInitData {
	workerIndex: number;
	consumeDataList?: WorkerConsumeData[];
	recursionState?: RecursionState[];
	startTime?: number;
	infoMessage: string;
}

export interface WorkerConsumeData {
	depotIndex: number;
	firstCustIndex: number;
}

/**
 * Communication between worker and target uses the WorkerData model
 * Each message has a type and payload
 * RecursionState is the state of a single recursive function
 * currentIndex stores which was the last index in loop
 * currentMinDistance and currentMinIndex stores the current mins for that depth
 * currentMinPath = paths[minIndex] in that recursion iteration
 * the whole state is sent as RecursionState[] where length determines depth
 * this is DFS so number of paths checked at any time can be calculated from the indices
 * currentSolutionCount for highest level = total paths checked upto that point
 * visitedArray can be set up again based on the current indices
 * depot-level comparison can be set up as another item in the list of recursion states
 * start time & end time of current iteration of interruption also stored
 */
