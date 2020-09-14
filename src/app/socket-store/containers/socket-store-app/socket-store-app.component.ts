import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-socket-store',
	templateUrl: './socket-store-app.component.html',
	styleUrls: ['./socket-store-app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocketStoreAppComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	openSocketDialog() {}
}
