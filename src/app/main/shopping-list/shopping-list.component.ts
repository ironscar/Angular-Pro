import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[] = [new Ingredient('test ingredient 1', 5), new Ingredient('test ingredient 2', 3)];

	constructor() {}

	ngOnInit(): void {}

	onIngredientAdded(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
	}

	onIngredientDeleted(ingredientName: string) {
		const newIngredientList = [];
		for (const ingredient of this.ingredients) {
			if (ingredient.name !== ingredientName) {
				newIngredientList.push(ingredient);
			}
		}
		this.ingredients = newIngredientList;
	}
}
