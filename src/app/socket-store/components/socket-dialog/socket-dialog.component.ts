import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-socket-dialog',
	templateUrl: './socket-dialog.component.html',
	styleUrls: ['./socket-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocketDialogComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
