import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditComponent implements OnInit {
	editingRecipe: Recipe;
	editMode = false;

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		this.recipeService.startEditingRecipe.subscribe((recipe: Recipe) => {
			this.editingRecipe = recipe;
			if (this.editingRecipe) {
				this.editMode = true;
			}
			console.log(this.editMode);
		});
	}
}

/**
 * Clean this up as the console seems to run too many times
 */
