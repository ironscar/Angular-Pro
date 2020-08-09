import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { StoreRecipe } from '../../first-store.models';

@Component({
	selector: 'app-recipe-edit-dialog',
	templateUrl: './recipe-edit-dialog.component.html',
	styleUrls: ['./recipe-edit-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditDialogComponent implements OnInit {
	storeRecipe: StoreRecipe;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<RecipeEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { isEditingRecipe: boolean; editableRecipe?: StoreRecipe }
	) {}

	ngOnInit() {
		this.firstFormGroup = new FormGroup({
			recipeNameCtrl: new FormControl(this.data.isEditingRecipe ? this.data.editableRecipe.recipeName : null, Validators.required)
		});
		this.secondFormGroup = new FormGroup({
			recipeDescCtrl: new FormControl(
				this.data.isEditingRecipe ? this.data.editableRecipe.recipeDescription : null,
				Validators.required
			)
		});
		this.thirdFormGroup = new FormGroup({
			ingred1NameCtrl: new FormControl(
				this.data.isEditingRecipe ? this.data.editableRecipe.ingredients[0].ingredientName : null,
				Validators.required
			),
			ingred1AmountCtrl: new FormControl(
				this.data.isEditingRecipe ? this.data.editableRecipe.ingredients[0].ingredientQuantity : null,
				Validators.required
			),
			ingred2NameCtrl: new FormControl(
				this.data.isEditingRecipe ? this.data.editableRecipe.ingredients[1].ingredientName : null,
				Validators.required
			),
			ingred2AmountCtrl: new FormControl(
				this.data.isEditingRecipe ? this.data.editableRecipe.ingredients[1].ingredientQuantity : null,
				Validators.required
			)
		});
	}

	onSubmitDialog() {
		this.storeRecipe = {
			recipeName: this.firstFormGroup.get('recipeNameCtrl').value,
			recipeDescription: this.secondFormGroup.get('recipeDescCtrl').value,
			ingredients: [
				{
					ingredientName: this.thirdFormGroup.get('ingred1NameCtrl').value,
					ingredientQuantity: this.thirdFormGroup.get('ingred1AmountCtrl').value
				},
				{
					ingredientName: this.thirdFormGroup.get('ingred2NameCtrl').value,
					ingredientQuantity: this.thirdFormGroup.get('ingred2AmountCtrl').value
				}
			]
		};
		this.dialogRef.close(this.storeRecipe);
	}

	onCloseDialog() {
		this.dialogRef.close(null);
	}
}
