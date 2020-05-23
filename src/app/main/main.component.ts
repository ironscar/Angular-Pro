import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ShoppingService } from './services/shopping.service';
import { ActivatedRoute } from '@angular/router';

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

	constructor(private shoppingService: ShoppingService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

	ngOnInit() {
		// get route params (can be firs time or reactive subscription as before)
		this.tabIndex = this.route.snapshot.params['id'];
		// get query params (can be firs time or reactive subscription as before)
		const queryParamTab = this.route.snapshot.queryParams['tab'];
		if (queryParamTab) {
			this.tabIndex = queryParamTab;
		}
		// get hash params (can be firs time or reactive subscription as before)
		const hashTab = this.route.snapshot.fragment;
		if (hashTab) {
			this.tabIndex = Number(hashTab.split('=')[1]);
		}

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
