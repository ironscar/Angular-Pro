/// <reference lib="webworker" />

import * as WebWorkerConstants from './web-worker.constants';
import { WorkerData } from './web-worker.model';

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
			console.log('worker' + workerData.payload.workerIndex, ' starting process with ', workerData.payload.consumeDataList);
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
			console.log('worker aborting process');
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

function postMessageToTarget(resultData: WorkerData) {
	postMessage(resultData);
}

/**
 * added in exclude section of tsconfig.app.json
 * added a tsconfig worker json
 * added tsconfig worker into angular.json
 */
