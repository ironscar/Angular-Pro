import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-dynamic-alert',
	templateUrl: './dynamic-alert.component.html',
	styleUrls: ['./dynamic-alert.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicAlertComponent implements OnInit {
	@Input() message = 'Dynamic alert component works';
	@Output() emitClose = new EventEmitter<void>();

	constructor() {}

	ngOnInit() {}

	closeAlert() {
		this.emitClose.emit();
	}
}
