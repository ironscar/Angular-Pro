import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [RecipeService]
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Recipe[] = [];
	selectedRecipe: Recipe = null;
	recipeSubscription: Subscription;

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		this.recipes = this.recipeService.getRecipeList();
		this.recipeSubscription = this.recipeService.selectedRecipeUpdated.subscribe((recipe: Recipe) => {
			this.selectedRecipe = recipe;
		});
	}

	onNewRecipe() {
		this.recipeService.setEditingRecipe(null);
	}

	ngOnDestroy() {
		this.recipeSubscription.unsubscribe();
	}
}
