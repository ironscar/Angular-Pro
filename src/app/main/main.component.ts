import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
	private static RECIPE_BOOK = 'Recipe-Book';
	private static SHOPPING_LIST = 'Shopping-List';

	appMode = MainComponent.RECIPE_BOOK;
	dropdownOpen = false;

	constructor() {}

	ngOnInit(): void {}

	changeAppMode() {
		if (this.appMode === MainComponent.RECIPE_BOOK) {
			this.appMode = MainComponent.SHOPPING_LIST;
		} else {
			this.appMode = MainComponent.RECIPE_BOOK;
		}
	}

	changeDropdownMode() {
		this.dropdownOpen = !this.dropdownOpen;
	}
}
