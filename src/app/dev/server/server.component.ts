import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-server',
	templateUrl: './server.component.html',
	styleUrls: ['./server.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerComponent {
	@Input() serverName = 'Server Default';
}
