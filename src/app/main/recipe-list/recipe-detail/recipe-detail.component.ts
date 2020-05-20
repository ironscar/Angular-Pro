import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingService } from '../../services/shopping.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent implements OnInit {
	@Input() recipe: Recipe;

	constructor(private recipeService: RecipeService, private shoppingService: ShoppingService) {}

	ngOnInit(): void {}

	toShoppingList() {
		this.shoppingService.onAddIngredientList(this.recipe.ingredients, true);
	}

	deleteRecipe() {
		this.recipeService.deleteRecipe(this.recipe);
	}
}
