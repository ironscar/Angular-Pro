import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	editingRecipe: Recipe;
	editMode = false;
	recipeSubscription: Subscription;

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		this.recipeSubscription = this.recipeService.startEditingRecipe.subscribe((recipe: Recipe) => {
			this.editingRecipe = recipe;
			if (this.editingRecipe) {
				this.editMode = true;
			}
			console.log(this.editMode);
		});
	}

	ngOnDestroy() {
		this.recipeSubscription.unsubscribe();
	}
}

/**
 * Clean this up as the console seems to run too many times
 */
