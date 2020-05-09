import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	title = 'angular-pro';
	flipDisable = false;
	serverNames = ['Server 1'];

	constructor(private cdr: ChangeDetectorRef) {
		setTimeout(() => {
			this.flipDisable = true;
			this.cdr.detectChanges();
		}, 2000);
	}

	onUpdateServerName(ev: Event) {
		this.serverNames[0] = (ev.target as HTMLInputElement).value;
	}

	onUpdateTitle() {
		this.title = 'Angular Pro';
	}
}
