/// <reference lib="webworker" />

import * as WebWorkerConstants from './web-worker.constants';
import { WorkerData } from './web-worker.model';

addEventListener('message', ({ data }) => {
	const workerData: WorkerData = data as WorkerData;
	switch (workerData.type) {
		case WebWorkerConstants.COMPUTE: {
			const response: WorkerData = {
				type: WebWorkerConstants.WORKER_ALERT,
				payload: 'worker response to ' + workerData.payload
			};
			postMessageToTarget(response);
			break;
		}
		default: {
			postMessageToTarget({
				type: WebWorkerConstants.WORKER_ALERT,
				payload: 'No such action defined on worker'
			});
		}
	}
});

function postMessageToTarget(resultData: WorkerData) {
	postMessage(resultData);
}

/**
 * added in exclude section of tsconfig.app.json
 * added a tsconfig worker json
 * added tsconfig worker into angular.json
 */
