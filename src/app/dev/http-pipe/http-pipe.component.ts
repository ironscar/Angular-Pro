import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'app-http-pipe',
	templateUrl: './http-pipe.component.html',
	styleUrls: ['./http-pipe.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpPipeComponent implements OnInit {
	moduleStatus = new Promise(resolve => {
		setTimeout(() => {
			resolve('Loaded');
		}, 4000);
	});
	filterString: string;
	filterProp: string;
	servers: { capacity: string; name: string; status: string; cores: number }[] = [
		{ capacity: 'medium', name: 'UAT Server', status: 'stable', cores: 16 },
		{ capacity: 'large', name: 'Production Server', status: 'stable', cores: 32 },
		{ capacity: 'large', name: 'SAT Server', status: 'stable', cores: 32 },
		{ capacity: 'small', name: 'Development Server', status: 'unstable', cores: 8 }
	];

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit() {}

	getColorFromCores(server: { capacity: string; name: string; status: string; cores: number }) {
		if (server.status === 'unstable') {
			return 'lightcoral';
		}
		if (server.cores <= 8) {
			return 'lightcoral';
		}
		if (server.cores <= 16) {
			return 'yellow';
		}
		return 'lightgreen';
	}

	onAddServer() {
		this.servers.push({ capacity: 'small', name: 'Test Server', status: 'unstable', cores: 8 });
		// force change to recalculate filter or use pure: false on pipe
		if (this.filterString) {
			const dummy = this.filterString;
			this.filterString += ' ';
			setTimeout(() => {
				this.filterString = dummy;
				this.cdr.detectChanges();
			}, 100);
		}
	}
}
