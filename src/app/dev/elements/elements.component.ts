import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-elements',
	templateUrl: './elements.component.html',
	styleUrls: ['./elements.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementsComponent implements OnInit {
	message = 'Hello Devs!';

	@Input() message2 = 'None';

	constructor() {}

	ngOnInit() {}

	updateMessage() {
		this.message = this.message === 'Hello Devs!' ? 'Hello World!' : 'Hello Devs!';
	}
}
