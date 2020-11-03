import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ComputeProblemService } from './compute-problem.service';
import * as WebWorkerConstants from './web-worker.constants';
import { ProblemData, RecursionState, WorkerConsumeData, WorkerData } from './web-worker.model';
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

	problemCreated = false;

	isComputing = false;
	abortCompute = false;
	solutionsChecked: number = null;
	bestSolution: string;
	bestDistance: number;
	totalTime: number;

	workersComputing = false;
	workersComputingList: boolean[] = [];
	workersAborted = false;
	workersSolutionsChecked: number = null;
	workersSolutionsCheckedList: number[] = [];
	workersBestSolution: string;
	workersBestSolutionList: string[] = [];
	workersBestDistance: number;
	workersBestDistanceList: number[] = [];
	workersTotalTime: number;
	workersTotalTimeList: number[] = [];
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
		this.bestSolution = null;
		this.totalTime = null;
		this.solutionsChecked = 0;
		this.bestDistance = null;

		this.workersBestSolution = null;
		this.workersTotalTime = null;
		this.workersSolutionsChecked = 0;
		this.workersBestDistance = null;

		this.problemCreated = true;
		this.computeService.initProblemInstance();
	}

	onMainThreadExec() {
		console.log('main thread used');
		this.isComputing = true;
		this.totalTime = new Date().getTime();
		this.solutionsChecked = 0;
		this.bestDistance = 0;
		this.bestSolution = null;
		setTimeout(() => {
			this.onMainThreadExecInternal();
		}, 100);
	}

	onMainThreadExecInternal(recursionState?: RecursionState[]) {
		recursionState = this.computeService.computeStatefulTestProblem(recursionState);
		this.isComputing = recursionState[0].computing && !this.abortCompute;
		this.solutionsChecked = recursionState[0].currentSolutionCount;
		this.bestDistance = recursionState[0].currentMinDistance;

		if (this.isComputing) {
			setTimeout(() => {
				this.onMainThreadExecInternal(recursionState);
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
		if (typeof Worker !== 'undefined') {
			this.onDestroyWorkers();
			this.workersComputing = true;
			this.workersTotalTime = new Date().getTime();
			this.workersSolutionsChecked = 0;
			this.workersBestDistance = 0;
			this.workersBestSolution = null;
			this.workersComputingList = [];
			this.workersSolutionsCheckedList = [];
			this.workersBestSolutionList = [];
			this.workersBestDistanceList = [];
			this.workersTotalTimeList = [];

			// get required number of threads
			const newWorkerCount = this.computeService.getRequiredWorkerCount(workerCount, 1);
			console.log('web workers required = ' + newWorkerCount);

			// create producer consumer data chain for each worker thread
			const workerConsumeData: WorkerConsumeData[][] = this.computeService.consolidateWorkerData(newWorkerCount);
			console.log('worker consume data = ', workerConsumeData);

			// reset and get all other variables like distanceMatrix, SolutionPath etc as one object
			const problemData: ProblemData = {
				depotNodes: this.computeService.depotNodes,
				depotVehicles: this.computeService.depotVehicles,
				customerNodes: this.computeService.customerNodes,
				distanceMatrix: this.computeService.computeAllDistances(),
				interruptTimeout: this.computeService.interruptTimeout,
				useTimerInterrupt: this.computeService.useTimerInterrupt,
				interruptSolutionCount: this.computeService.interruptSolutionCount,
				totalSolutionCount: 0,
				iteratedSolutionCount: 0
			};

			// create the workers
			for (let i = 0; i < newWorkerCount; i++) {
				this.workersComputingList.push(true);
				this.workersSolutionsCheckedList.push(0);
				this.workersBestSolutionList.push(null);
				this.workersBestDistanceList.push(null);
				this.workersTotalTimeList.push(this.workersTotalTime);
				this.createWorker(i, workerConsumeData[i], problemData);
			}
		} else {
			// Web workers are not supported in this environment.
			console.log('web workers cannot be created here');
		}
	}

	createWorker(index: number, workerConsumeData: WorkerConsumeData[], problemData: ProblemData) {
		// Create a new worker
		const worker = new Worker('./app.worker', { type: 'module' });
		worker.onmessage = ({ data }) => {
			const workerData: WorkerData = data as WorkerData;
			switch (workerData.type) {
				case WebWorkerConstants.COMPUTE_PROGRESS: {
					// get progress report and update statistics after aggregating results
					const recursionState = workerData.payload.recursionState;
					const workerIndex = workerData.payload.workerIndex;

					// test
					console.log('index ' + workerIndex + ' current state = ', recursionState);

					// worker-specific results
					this.workersComputingList[workerIndex] = recursionState[0].computing && !this.abortCompute;
					if (this.workersComputingList[workerIndex]) {
						this.workersSolutionsCheckedList[workerIndex] = recursionState[0].currentSolutionCount;
						this.workersBestDistanceList[workerIndex] = recursionState[0].currentMinDistance;
					}

					// aggregate results
					this.workersComputing = (this.workersComputingList[workerIndex] || this.workersComputing) && !this.abortCompute;
					if (this.workersComputingList[workerIndex]) {
						this.workersSolutionsChecked += workerData.payload.iteratedSolCount;
						if (!this.workersBestDistance || this.workersBestDistance > this.workersBestDistanceList[workerIndex]) {
							this.workersBestDistance = this.workersBestDistanceList[workerIndex];
						}
					}

					this.cdr.detectChanges();
					break;
				}
				case WebWorkerConstants.COMPUTE_END: {
					// end process
					const recursionState = workerData.payload.recursionState;
					const workerIndex = workerData.payload.workerIndex;

					// worker-specific results
					this.workersComputingList[workerIndex] = false;
					this.workersSolutionsCheckedList[workerIndex] = recursionState[0].currentSolutionCount;
					this.workersBestDistanceList[workerIndex] = recursionState[0].currentMinDistance;
					this.workersBestSolutionList[workerIndex] = workerData.payload.recursionState[0].currentMinPath.join('<-');
					this.workersTotalTimeList[workerIndex] = new Date().getTime() - this.workersTotalTimeList[workerIndex];

					// aggregate result from different workers
					this.workersAborted = false;
					this.workersComputing = this.workersComputingList[workerIndex] || this.workersComputing;
					this.workersSolutionsChecked += workerData.payload.iteratedSolCount;
					if (!this.workersBestDistance || this.workersBestDistance > this.workersBestDistanceList[workerIndex]) {
						this.workersBestDistance = this.workersBestDistanceList[workerIndex];
					}

					// aggregate only if all computes done
					if (!this.workersComputing) {
						let bestIndexOfAllThreads = 0;
						let bestSolOfAllThreads = this.workersBestDistanceList[0];
						for (let i = 1; i < this.workers.length; i++) {
							if (bestSolOfAllThreads > this.workersBestDistanceList[i]) {
								bestSolOfAllThreads = this.workersBestDistanceList[i];
								bestIndexOfAllThreads = i;
							}
						}
						this.workersBestSolution = this.workersBestSolutionList[bestIndexOfAllThreads];
						this.workersTotalTime = this.workersTotalTimeList[workerIndex];
					}

					this.cdr.detectChanges();
					break;
				}
				case WebWorkerConstants.WORKER_ALERT: {
					// do something
					console.log('ALERT: ' + workerData.payload.infoMessage);
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

		// get started
		const postData: WorkerData = {
			type: WebWorkerConstants.COMPUTE,
			payload: {
				workerIndex: index,
				consumeDataList: workerConsumeData,
				startTime: this.totalTime,
				problemData,
				infoMessage: 'start process'
			}
		};
		worker.postMessage(postData);
	}

	onWebWorkersAbort() {
		// abort all workers
		this.workersAborted = true;
		this.workers.map((worker, index) => {
			const postData: WorkerData = {
				type: WebWorkerConstants.ABORT,
				payload: {
					workerIndex: index,
					infoMessage: 'abort process'
				}
			};
			worker.postMessage(postData);
		});
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
