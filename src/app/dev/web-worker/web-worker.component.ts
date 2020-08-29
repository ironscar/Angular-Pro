import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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

	constructor(private computeService: ComputeProblemService, @Inject(PLATFORM_ID) private platformId) {}

	ngOnInit() {
		if (isPlatformBrowser(this.platformId)) {
			this.onRegisterServiceWorker();
		} else {
			console.log('service workers not on server');
		}
	}

	onRegisterServiceWorker() {
		if ('serviceWorker' in navigator) {
			console.log('service worker api exists');
			navigator.serviceWorker.register('./service-worker.js').then(
				registration => {
					console.log('service worker registration successful with ', registration);
				},
				error => {
					console.log('service worker registration failed with ', error);
				}
			);
		}
	}

	onSendMessageToServiceWorker() {
		if (navigator.serviceWorker.controller) {
			const messageChannel = new MessageChannel();
			messageChannel.port1.onmessage = (event: MessageEvent) => {
				console.log('response from service worker: ', event.data);
			};
			console.log('sending message to service worker');
			navigator.serviceWorker.controller.postMessage(
				{
					type: 'TWO_WAY_COMMUNICATION',
					payload: 'Hi, service worker!'
				},
				[messageChannel.port2]
			);
		} else {
			console.log('no active service worker');
		}
	}

	onGenerateProblem() {
		this.computeService.initRandomInstanceOfProblem();
	}

	onMainThreadExec() {
		console.log('main thread used');
		this.computeService.computeProblem();
	}

	onWebWorkerExec(workerCount: number) {
		this.isComputing = true;
		console.log('web workers required = ' + workerCount);
		if (typeof Worker !== 'undefined') {
			for (let i = 0; i < workerCount; i++) {
				this.createWorker();
			}
		} else {
			// Web workers are not supported in this environment.
			console.log('web workers cannot be created here');
		}
		this.isComputing = false;
	}

	createWorker() {
		// Create a new worker
		const worker = new Worker('./app.worker', { type: 'module' });
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
		this.workers.push(worker);

		// check results
		const postData: WorkerData = {
			type: WebWorkerConstants.COMPUTE,
			payload: 'hello' + this.workers.length
		};
		worker.postMessage(postData);
	}

	onDestroyWorkers() {
		this.workers.map(worker => worker.terminate());
		this.workers = [];
	}

	ngOnDestroy() {
		this.onDestroyWorkers();
	}
}

/**
 * Write custom web workers for multithreaded computations
 * and service worker for push-notifications/response-caching etc
 * For service worker, omit window load listener as it is already inside ngOnInit
 * Add file to src and add path to assets folder of angular.json for both serve and build
 * Make sure to use platformId as it only runs on browser, if using universal
 * Since service workers are an interface of web workers, you may be able to create it as is but this is easier to follow along
 * Creates threads to solve a problem, later make a service project out of the problem
 * Web workers only work on browser and not on server so fallbacks are required
 * Web workers show up in the Sources tab under threads in browser tools
 */
