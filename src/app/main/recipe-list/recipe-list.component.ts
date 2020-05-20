import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [RecipeService]
})
export class RecipeListComponent implements OnInit {
	recipes: Recipe[] = [];
	selectedRecipe: Recipe = null;

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		this.recipes = this.recipeService.getRecipeList();
		this.recipeService.selectedRecipeUpdated.subscribe((recipe: Recipe) => {
			this.selectedRecipe = recipe;
		});
	}
}
