import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
	title = 'Angular Unit Testing';

	constructor() {}

	ngOnInit() {}
}
