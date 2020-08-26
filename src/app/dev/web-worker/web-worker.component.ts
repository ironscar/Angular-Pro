import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ComputeProblemService } from './compute-problem.service';
import * as WebWorkerConstants from './web-worker.constants';
import { WorkerData } from './web-worker.model';

@Component({
	selector: 'app-web-worker',
	templateUrl: './web-worker.component.html',
	styleUrls: ['./web-worker.component.scss'],
	providers: [ComputeProblemService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebWorkerComponent implements OnInit, OnDestroy {
	isComputing = false;
	workers: Worker[] = [];

	constructor(private computeService: ComputeProblemService) {}

	ngOnInit() {}

	onMainThreadExec() {
		console.log('main thread used');
		this.computeService.computeProblem();
	}

	onWebWorkerExec(workerCount: number) {
		this.isComputing = true;
		console.log('web workers required = ' + workerCount);
		this.createWorker();
		this.isComputing = false;
	}

	createWorker() {
		if (typeof Worker !== 'undefined') {
			// Create a new worker
			const worker = new Worker('./app.worker', { type: 'module' });
			this.workers.push(worker);
			worker.onmessage = ({ data }) => {
				const workerData: WorkerData = data as WorkerData;
				switch (workerData.type) {
					case WebWorkerConstants.COMPUTE_COUNT: {
						// do something
						break;
					}
					case WebWorkerConstants.COMPUTE_END: {
						// do something
						break;
					}
					case WebWorkerConstants.WORKER_ALERT: {
						// do something
						console.log('ALERT: ' + workerData.payload);
						break;
					}
					default:
						console.log('no such handle');
				}
			};
			worker.onerror = () => {
				console.log('worker error');
			};

			// check results
			const postData: WorkerData = {
				type: WebWorkerConstants.COMPUTE,
				payload: 'hello'
			};
			worker.postMessage(postData);
		} else {
			// Web workers are not supported in this environment.
			console.log('web workers cannot be created here');
		}
	}

	onDestroyWorkers() {
		this.workers.map(worker => worker.terminate());
	}

	ngOnDestroy() {
		this.onDestroyWorkers();
	}
}

/**
 * Write custom web workers for multithreaded computations
 * and service worker for push-notifications/response-caching etc
 * Creates threads to solve a problem, later make a service project out of the problem
 * Web workers only work on browser and not on server so fallbacks are required
 */
