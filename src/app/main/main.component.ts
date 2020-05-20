import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ShoppingService } from './services/shopping.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ShoppingService]
})
export class MainComponent implements OnInit {
	tabIndex = 0;
	dropdownOpen = false;

	constructor(private shoppingService: ShoppingService, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.shoppingService.recipeIngredsAdded.subscribe(() => {
			this.changeAppMode();
			this.cdr.detectChanges();
		});
	}

	changeAppMode() {
		if (this.tabIndex === 0) {
			this.tabIndex = 1;
		} else {
			this.tabIndex = 0;
		}
	}

	changeDropdownMode() {
		this.dropdownOpen = !this.dropdownOpen;
	}
}
