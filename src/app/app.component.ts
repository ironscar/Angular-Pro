import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	title = 'Angular Pro';
	type = 'Dev';

	constructor(private router: Router) {}

	onLoadOtherType() {
		if (this.type === 'Main') {
			this.type = 'Dev';
		} else {
			this.type = 'Main';
		}
		this.router.navigate([this.type.toLowerCase()]);
	}
}
