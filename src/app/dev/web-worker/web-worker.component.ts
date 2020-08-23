import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-web-worker',
	templateUrl: './web-worker.component.html',
	styleUrls: ['./web-worker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebWorkerComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	onMainThreadExec() {
		console.log('main thread used');
	}

	onWebWorkerExec(workerCount: number) {
		console.log('web workers required = ' + workerCount);
	}
}

/**
 * Write custom web workers for multithreaded computations
 * and service worker for push-notifications/response-caching etc
 */
