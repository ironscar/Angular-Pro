import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { State } from 'src/app/reducers';
import { StoreRecipe } from 'src/app/first-store/first-store.models';
import { getStoredRecipes } from 'src/app/first-store/selectors/first-store.selectors';
import * as SecondStoreActions from '../../actions/second-store.actions';
import { ShoppingIngredient } from '../../second-store.models';
import {
	getIngredientList,
	getShoppingAlert,
	getTotalPrice,
	getOutdatedStatus,
	getShoppingFrequency
} from '../../selectors/second-store.selectors';

@Component({
	selector: 'app-second-store',
	templateUrl: './second-store-app.component.html',
	styleUrls: ['./second-store-app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStoreAppComponent implements OnInit, OnDestroy {
	private storeSubscriptions: Subscription[];

	recipeList: StoreRecipe[] = [];
	ingredientList: ShoppingIngredient[];
	alertMessage: string;
	shoppingPrice: number;
	shoppingFrequency: number;
	status = false;

	constructor(private store: Store<State>, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.storeSubscriptions = [
			this.store.select(getStoredRecipes).subscribe(firstStoreRecipes => {
				this.recipeList = firstStoreRecipes;
				if (this.ingredientList === undefined) {
					this.status = true;
				}
				this.cdr.detectChanges();
			}),
			this.store.select(getIngredientList).subscribe(ingredients => {
				this.ingredientList = [];
				if (ingredients) {
					ingredients.forEach(ingredient => this.ingredientList.push(ingredient));
				}
				if (this.ingredientList.length === 0 && this.status) {
					this.status = false;
				}
				this.cdr.detectChanges();
				console.log('ingred update');
			}),
			this.store.select(getShoppingAlert).subscribe(alert => {
				this.alertMessage = alert;
				this.cdr.detectChanges();
				console.log('alert update');
			}),
			this.store.select(getTotalPrice).subscribe(price => {
				this.shoppingPrice = price;
				this.cdr.detectChanges();
				console.log('price update');
			}),
			this.store.select(getOutdatedStatus).subscribe(status => {
				if (this.status !== status) {
					this.store.dispatch(new SecondStoreActions.UpdateOutdatedStatus(this.status));
				}
				this.cdr.detectChanges();
				console.log('status update');
			}),
			this.store.select(getShoppingFrequency).subscribe(freq => {
				this.shoppingFrequency = freq;
				this.cdr.detectChanges();
				console.log('freq update');
			})
		];
	}

	getAllRecipeIngredients() {
		this.status = false;
		this.store.dispatch(new SecondStoreActions.GetAllRecipeIngredients(this.recipeList));
	}

	clearAllIngredients() {
		this.status = false;
		this.store.dispatch(new SecondStoreActions.ClearAllIngredients(this.status));
	}

	onBuyIngredients() {
		const formattedPrice = '$' + this.shoppingPrice.toFixed(2) + ' (USD)';
		this.store.dispatch(new SecondStoreActions.BuyAllIngredients(formattedPrice));
	}

	ngOnDestroy() {
		this.storeSubscriptions.map(subs => subs.unsubscribe());
	}
}

/**
 * Set up second store module using global state
 * It gets all recipes from first store and updates all ingredients used there
 * It checks whether the current ingredient list is outdated or not
 * allows updating or clearing ingredient list based on current recipes
 * notice in what order each part of the store gets updated in ngOnInit subscriptions
 * also added custom scroll bar styles in styles.scss as global styles
 * buy action calls an effect that also calls clear ingredients action
 */
