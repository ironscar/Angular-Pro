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

	toIconReference() {
		window.open('https://www.w3schools.com/icons/icons_reference.asp', '_blank');
	}

	toRxjsOperatorsAPI() {
		window.open('https://rxjs.dev/guide/operators', '_blank');
	}

	toNgrxAPI() {
		window.open('https://ngrx.io/', '_blank');
	}

	toFlexLayoutAPI() {
		window.open('https://tburleson-layouts-demos.firebaseapp.com/#/docs', '_blank');
	}

	toMaterialAPI() {
		window.open('https://material.angular.io/components/categories', '_blank');
	}
}
