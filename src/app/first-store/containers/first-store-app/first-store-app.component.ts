import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { StoreRecipe } from '../../first-store.models';
import { State } from 'src/app/reducers';
import * as FirstStoreActions from '../../actions/first-store.actions';
import { getStoredRecipes } from '../../selectors/first-store.selectors';
import { RecipeEditDialogComponent } from '../../components/recipe-edit-dialog/recipe-edit-dialog.component';

@Component({
	selector: 'app-first-store',
	templateUrl: './first-store-app.component.html',
	styleUrls: ['./first-store-app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStoreAppComponent implements OnInit, OnDestroy {
	private creatingNewRecipe = false;
	private editingNewRecipe = false;
	private recipeSubscription: Subscription;

	recipeList: StoreRecipe[] = [];

	constructor(private store: Store<State>, private dialog: MatDialog) {
		this.recipeSubscription = this.store.select(getStoredRecipes).subscribe(firstStoreData => {
			this.recipeList = firstStoreData;
		});
	}

	ngOnInit() {}

	onNewRecipe() {
		this.creatingNewRecipe = true;
		const dialogRef = this.dialog.open(RecipeEditDialogComponent, {
			height: '400px',
			width: '600px',
			data: {
				isEditingRecipe: false
			}
		});
		dialogRef.afterClosed().subscribe((result: StoreRecipe) => {
			console.log('new dialog result:', result);
		});
	}

	onEditRecipe(recipeIndex: number) {
		this.editingNewRecipe = true;
		const dialogRef = this.dialog.open(RecipeEditDialogComponent, {
			height: '400px',
			width: '600px',
			data: {
				isEditingRecipe: true,
				editableRecipe: this.recipeList[recipeIndex]
			}
		});
		dialogRef.afterClosed().subscribe((result: StoreRecipe) => {
			console.log('edit dialog result:', result);
		});
	}

	onDuplicateRecipe(recipeIndex: number) {
		this.store.dispatch(new FirstStoreActions.DuplicateStoreRecipe(recipeIndex));
	}

	onDeleteRecipe(recipeIndex: number) {
		this.store.dispatch(new FirstStoreActions.DeleteStoreRecipe(recipeIndex));
	}

	ngOnDestroy() {
		this.recipeSubscription.unsubscribe();
	}
}
