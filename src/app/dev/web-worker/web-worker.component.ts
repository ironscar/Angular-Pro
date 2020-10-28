import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ComputeProblemService } from './compute-problem.service';
import * as WebWorkerConstants from './web-worker.constants';
import { RecursionState, WorkerData } from './web-worker.model';
import { BackendApiService } from '../services/backend-api.service';
import { Subscription } from 'rxjs';
import { UserRecord } from '../http-pipe/user.interface';

@Component({
	selector: 'app-web-worker',
	templateUrl: './web-worker.component.html',
	styleUrls: ['./web-worker.component.scss'],
	providers: [ComputeProblemService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebWorkerComponent implements OnInit, OnDestroy {
	users: UserRecord[] = [];
	responseSubscription: Subscription;
	errorSubscription: Subscription;
	dynamicCacheProgress = false;

	isComputing = false;
	abortCompute = false;
	solutionsChecked: number;
	bestSolution: string;
	bestDistance: number;
	totalTime: number;
	workers: Worker[] = [];

	constructor(
		private computeService: ComputeProblemService,
		private apiService: BackendApiService,
		@Inject(PLATFORM_ID) private platformId,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		if (isPlatformBrowser(this.platformId)) {
			this.onRegisterServiceWorker();
			this.onSetUpApiService();
		} else {
			console.log('service workers not on server');
		}
	}

	onSetUpApiService() {
		// this is set to true at start as the back end call is made somewhere else and this listens to it at start
		this.dynamicCacheProgress = true;
		this.responseSubscription = this.apiService.responseSubject.subscribe((response: { type: string; users: UserRecord[] }) => {
			if (response.type === 'all') {
				console.log('get all users', response.users);
				this.users = response.users;
				this.dynamicCacheProgress = false;
				this.cdr.detectChanges();
			}
		});
		this.errorSubscription = this.apiService.errorSubject.subscribe(data => {
			console.log('api http error ', data);
			this.dynamicCacheProgress = false;
			this.cdr.detectChanges();
		});
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

	makeApiCall() {
		this.users = [];
		this.dynamicCacheProgress = true;
		this.apiService.getAllUsers();
	}

	requestNotificationPermission() {
		if (Notification.requestPermission) {
			Notification.requestPermission().then((permission: string) => {
				console.log('push notification permission ', permission);
			});
		} else {
			console.log('push notifications are not supported on this browser');
		}
	}

	showNotification() {
		if (navigator.serviceWorker.controller) {
			navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
				const title = 'Gnomon Live Class';
				const options: NotificationOptions = {
					tag: 'enroll_now',
					image: './assets/images/gnomon-live-class.jpg',
					body: 'Learn from working professionals in \nspecific areas of expertise',
					actions: [
						{
							action: 'enroll-now',
							title: 'Enroll now'
						}
					],
					requireInteraction: true
				};
				registration.showNotification(title, options);
			});
		} else {
			console.log('no active service worker');
		}
	}

	onGenerateProblem() {
		this.computeService.initTestProblemInstance();
	}

	onMainThreadExec(recursionState?: RecursionState[]) {
		if (!recursionState) {
			console.log('main thread used');
			this.isComputing = true;
			this.totalTime = new Date().getTime();
			this.solutionsChecked = 0;
			this.bestDistance = 0;
			this.bestSolution = null;
		}
		recursionState = this.computeService.computeStatefulTestProblem(recursionState);
		this.isComputing = recursionState[0].computing && !this.abortCompute;
		this.solutionsChecked = recursionState[0].currentSolutionCount;
		this.bestDistance = recursionState[0].currentMinDistance;

		if (this.isComputing) {
			setTimeout(() => {
				this.onMainThreadExec(recursionState);
			}, 100);
		} else {
			this.abortCompute = false;
			this.bestSolution = recursionState[0].currentMinPath.join('<-');
			this.totalTime = recursionState[0].currentEndTime - this.totalTime;
			console.log('time taken = ', this.totalTime, 'ms');
			console.log('computed ', this.solutionsChecked, ' paths');
		}
		this.cdr.detectChanges();
	}

	onMainThreadAbort() {
		this.abortCompute = true;
		console.log('abort process');
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
 * This shows how to send notifications, push notifications are when the server directly sends it to worker without getting a request
 * Push notifications would require keys and message-push server etc which need not be done now
 * Used same api service as created for http module to show dynamic caching in service workers
 * Using caches in service worker changes no implementation in here which is a benefit
 * Creates threads to solve a problem, later make a service project out of the problem
 * Web workers only work on browser and not on server so fallbacks are required
 * Web workers show up in the Sources tab under threads in browser tools
 */
