import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeItemComponent implements OnInit {
	@Input() recipe: Recipe;
	@Output() selectedRecipe = new EventEmitter<Recipe>();

	constructor() {}

	ngOnInit(): void {}

	onRecipeItemClicked() {
		this.selectedRecipe.emit(this.recipe);
	}
}
