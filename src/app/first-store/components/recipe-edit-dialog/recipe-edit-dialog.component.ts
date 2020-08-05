import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreRecipe } from '../../first-store.models';

@Component({
	selector: 'app-recipe-edit-dialog',
	templateUrl: './recipe-edit-dialog.component.html',
	styleUrls: ['./recipe-edit-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditDialogComponent implements OnInit {
	storeRecipe: StoreRecipe;

	constructor(
		public dialogRef: MatDialogRef<RecipeEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { isEditingRecipe: boolean; editableRecipe?: StoreRecipe }
	) {}

	ngOnInit() {
		if (this.data.isEditingRecipe) {
			// editing existing (if ingredients edited, create new copies of ingredients)
			this.storeRecipe = {
				recipeName: this.data.editableRecipe.recipeName,
				recipeDescription: this.data.editableRecipe.recipeDescription,
				ingredients: [...this.data.editableRecipe.ingredients]
			};
		} else {
			// creating new
			this.storeRecipe = {
				recipeName: null,
				recipeDescription: null,
				ingredients: []
			};
		}
	}

	onCloseDialog() {
		this.dialogRef.close(this.storeRecipe);
	}
}
