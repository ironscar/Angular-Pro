import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	private static DEV_TYPE = 'Dev';
	private static MAIN_TYPE = 'Main';
	title = 'Angular Pro';
	type = AppComponent.DEV_TYPE;

	constructor(private router: Router) {}

	ngOnInit() {
		if (!window.location.href.endsWith(this.type.toLowerCase())) {
			this.onLoadOtherType();
		}
	}

	onLoadOtherType() {
		if (this.type === AppComponent.MAIN_TYPE) {
			this.type = AppComponent.DEV_TYPE;
		} else {
			this.type = AppComponent.MAIN_TYPE;
		}
		this.router.navigate([this.type.toLowerCase()]);
	}

	toFlexLayoutAPI() {
		window.open('https://tburleson-layouts-demos.firebaseapp.com/#/docs', '_blank');
	}

	toMaterialAPI() {
		window.open('https://material.angular.io/components/categories', '_blank');
	}
}
