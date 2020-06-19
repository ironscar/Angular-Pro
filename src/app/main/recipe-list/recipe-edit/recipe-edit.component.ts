import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	editingRecipe: Recipe;
	updatingRecipe = false;
	editRecipeSubscription: Subscription;
	recipeForm: FormGroup;

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		this.editingRecipe = this.recipeService.getEditingRecipe();
		if (this.editingRecipe) {
			this.updatingRecipe = true;
		}
		this.editRecipeSubscription = this.recipeService.startEditingRecipe.subscribe(() => {
			// comes here only on new recipe which is null at start
			this.updatingRecipe = false;
			this.editingRecipe = null;
			this.createNewRecipe();
		});
		this.createNewRecipe();
		if (this.updatingRecipe) {
			this.populateRecipeForm();
		}
	}

	createNewRecipe() {
		this.recipeForm = new FormGroup({
			recipeName: new FormControl(null, Validators.required),
			recipeDesc: new FormControl(null, Validators.required),
			recipeImage: new FormControl(null, Validators.required),
			ingredients: new FormArray([])
		});
		if (!this.updatingRecipe) {
			this.onAddIngredient();
		}
	}

	populateRecipeForm() {
		this.recipeForm.get('recipeName').setValue(this.editingRecipe.name);
		this.recipeForm.get('recipeDesc').setValue(this.editingRecipe.description);
		this.recipeForm.get('recipeImage').setValue(this.editingRecipe.imagePath);
		for (const ingredient of this.editingRecipe.ingredients) {
			this.onAddIngredient(ingredient.name, ingredient.quantity);
		}
	}

	onAddIngredient(name: string = null, quantity: number = null) {
		const newIngredient = new FormGroup({
			ingredientName: new FormControl(name, Validators.required),
			ingredientAmount: new FormControl(quantity, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
		});
		(this.recipeForm.get('ingredients') as FormArray).push(newIngredient);
	}

	getIngredientList() {
		return (this.recipeForm.get('ingredients') as FormArray).controls;
	}

	onSubmitRecipe() {
		const newRecipe: Recipe = {
			name: this.recipeForm.get('recipeName').value,
			description: this.recipeForm.get('recipeDesc').value,
			imagePath: this.recipeForm.get('recipeImage').value,
			ingredients: []
		};
		for (const ingredient of this.getIngredientList()) {
			const newIngredient: Ingredient = {
				name: ingredient.get('ingredientName').value,
				quantity: Number(ingredient.get('ingredientAmount').value)
			};
			newRecipe.ingredients.push(newIngredient);
		}
		if (!this.updatingRecipe) {
			this.updatingRecipe = false;
			this.recipeService.addRecipe(newRecipe);
		} else {
			this.editingRecipe.name = newRecipe.name;
			this.editingRecipe.description = newRecipe.description;
			this.editingRecipe.imagePath = newRecipe.imagePath;
			this.editingRecipe.ingredients = newRecipe.ingredients;
			this.recipeService.setSelectedRecipe(this.editingRecipe);
		}
	}

	onClearForm() {
		this.recipeForm.reset();
		if (this.updatingRecipe) {
			this.updatingRecipe = false;
			this.recipeService.setSelectedRecipe(this.editingRecipe);
		}
	}

	ngOnDestroy() {
		this.editRecipeSubscription.unsubscribe();
	}
}
