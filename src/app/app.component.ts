import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	toFlexLayoutAPI() {
		window.open('https://tburleson-layouts-demos.firebaseapp.com/#/docs', '_blank');
	}

	toMaterialAPI() {
		window.open('https://material.angular.io/components/categories', '_blank');
	}
}
