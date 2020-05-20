import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeItemComponent implements OnInit {
	@Input() recipe: Recipe;

	constructor(private recipeService: RecipeService) {}

	ngOnInit(): void {}

	onRecipeItemClicked() {
		this.recipeService.setSelectedRecipe(this.recipe);
	}
}
