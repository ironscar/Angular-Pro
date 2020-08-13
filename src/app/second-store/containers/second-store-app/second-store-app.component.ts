import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-second-store',
	templateUrl: './second-store-app.component.html',
	styleUrls: ['./second-store-app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStoreAppComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}

/**
 * Set up second store module using global state and doing some extra things
 */
