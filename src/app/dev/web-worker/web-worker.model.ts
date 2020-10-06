export interface WorkerData {
	type: string;
	payload: any;
}

export interface PathNode {
	pathNodes: number[];
	pathDistance: number;
}

/**
 * Communication between worker and target uses the WorkerData model
 * Each message has a type and payload
 */
