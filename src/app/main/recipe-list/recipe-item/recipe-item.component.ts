import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeItemComponent implements OnInit, OnDestroy {
	@Input() recipe: Recipe;

	private recipeSubscription: Subscription;

	constructor(private recipeService: RecipeService, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.recipeSubscription = this.recipeService.selectedRecipeUpdated.subscribe((recipe: Recipe) => {
			if (recipe) {
				this.cdr.detectChanges();
			}
		});
	}

	onRecipeItemClicked() {
		this.recipeService.setSelectedRecipe(this.recipe);
	}

	ngOnDestroy() {
		this.recipeSubscription.unsubscribe();
	}
}
