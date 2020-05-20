import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../services/shopping.service';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[] = [];

	constructor(private shoppingService: ShoppingService, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		/* here when ingredients are added from recipe, it doesn't
		 * detect changes as ingredients is still same reference
		 * so we use cdr to detect changes by subscribing to it
		 */
		this.ingredients = this.shoppingService.getIngredients();
		this.shoppingService.recipeIngredsAdded.subscribe(() => {
			this.cdr.detectChanges();
		});
	}
}
