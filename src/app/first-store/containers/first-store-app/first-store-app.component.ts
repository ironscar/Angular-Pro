import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { StoreRecipe, StoreUser } from '../../first-store.models';
import { State } from 'src/app/reducers';
import * as FirstStoreActions from '../../actions/first-store.actions';
import { getStoredRecipes, getLoggedInUsername, getApiCallStatus } from '../../selectors/first-store.selectors';
import { RecipeEditDialogComponent } from '../../components/recipe-edit-dialog/recipe-edit-dialog.component';

@Component({
	selector: 'app-first-store',
	templateUrl: './first-store-app.component.html',
	styleUrls: ['./first-store-app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStoreAppComponent implements OnInit, OnDestroy {
	private storeSubscriptions: Subscription[];

	username: string;
	currentCallStatus: boolean;
	recipeList: StoreRecipe[] = [];

	constructor(private store: Store<State>, private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.storeSubscriptions = [
			this.store.select(getStoredRecipes).subscribe(firstStoreData => {
				this.recipeList = firstStoreData;
				this.cdr.detectChanges();
			}),

			this.store.select(getLoggedInUsername).subscribe(user => {
				this.username = user;
				this.cdr.detectChanges();
			}),

			this.store.select(getApiCallStatus).subscribe(status => {
				// use ths flag to know when api call is happening
				this.currentCallStatus = status;
				this.cdr.detectChanges();
			})
		];
	}

	onStoreAPILogin() {
		/*
		 * send the admin details from here directly as its just a show of effects
		 * ideally you would take inputs and then do this
		 */
		const correctLoginUser: StoreUser = { username: 'admin', password: 'admin123' };
		// const wrongLoginUser: StoreUser = { username: 'adminx', password: 'adsfdsfsd' };
		const loginUser = correctLoginUser;
		if (!this.username || this.username === 'UNDEF' || this.username === 'N') {
			this.store.dispatch(new FirstStoreActions.FirstStoreApiStart(loginUser));
		} else {
			console.log('user already logged in so no api call made, reload page to see effects feature');
		}
	}

	onNewRecipe() {
		const dialogRef = this.dialog.open(RecipeEditDialogComponent, {
			width: '600px',
			data: {
				isEditingRecipe: false
			},
			disableClose: true
		});
		dialogRef.afterClosed().subscribe((result: StoreRecipe) => {
			if (result) {
				this.store.dispatch(new FirstStoreActions.NewStoreRecipe(result));
			}
		});
	}

	onEditRecipe(recipeIndex: number) {
		const dialogRef = this.dialog.open(RecipeEditDialogComponent, {
			width: '600px',
			data: {
				isEditingRecipe: true,
				editableRecipe: this.recipeList[recipeIndex]
			},
			disableClose: true
		});
		dialogRef.afterClosed().subscribe((result: StoreRecipe) => {
			if (result) {
				this.store.dispatch(new FirstStoreActions.EditStoreRecipe(recipeIndex, result));
			}
		});
	}

	onDuplicateRecipe(recipeIndex: number) {
		this.store.dispatch(new FirstStoreActions.DuplicateStoreRecipe(recipeIndex));
	}

	onDeleteRecipe(recipeIndex: number) {
		this.store.dispatch(new FirstStoreActions.DeleteStoreRecipe(recipeIndex));
	}

	ngOnDestroy() {
		this.storeSubscriptions.map(sub => sub.unsubscribe());
	}
}
/**
 * Actions are dispatched to all reducers as we use the app-wide store state in containers
 * For similar reasons, action types are prefixed to ensure uniqueness across app
 */
