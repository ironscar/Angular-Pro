import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-first-store',
	templateUrl: './first-store-app.component.html',
	styleUrls: ['./first-store-app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStoreAppComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
