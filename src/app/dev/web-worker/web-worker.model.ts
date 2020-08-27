export interface WorkerData {
	type: string;
	payload: any;
}

/**
 * Communication between worker and target uses this model
 * Each message has a type and payload
 */
