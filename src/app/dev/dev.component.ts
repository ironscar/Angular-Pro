import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-dev',
	templateUrl: './dev.component.html',
	styleUrls: ['./dev.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevComponent {
	flipDisable = false;
	profileName = 'Profile A';
	profileFlag = false;
	serverNames = ['Server 1', 'Server 2', 'Server 3'];
	value = 10;

	constructor(private cdr: ChangeDetectorRef) {
		setTimeout(() => {
			this.flipDisable = true;
			this.cdr.detectChanges();
		}, 2000);
	}

	addServer() {
		this.serverNames.push('Server ' + (this.serverNames.length + 1));
	}

	getColor(index: number) {
		return this.isValidServerName(index) ? 'green' : 'red';
	}

	isValidServerName(index: number) {
		return this.serverNames[index].indexOf('Server') !== -1;
	}

	onUpdateServerName(ev: Event, index: number = 0) {
		if (index === 0) {
			this.serverNames[0] = (ev.target as HTMLInputElement).value;
		} else if (index === 1) {
			this.serverNames[1] = 'Server 2';
		}
	}

	onUpdateProfileFlag() {
		this.profileFlag = !this.profileFlag;
	}

	updateProfileName(name: string) {
		this.profileName = name;
	}
}
