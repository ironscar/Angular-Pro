import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreRecipe } from '../../first-store.models';
import { State } from 'src/app/reducers';
import { Subscription } from 'rxjs';
import { getStoredRecipes } from '../../selectors/first-store.selectors';

@Component({
	selector: 'app-first-store',
	templateUrl: './first-store-app.component.html',
	styleUrls: ['./first-store-app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStoreAppComponent implements OnInit, OnDestroy {
	private recipeSubscription: Subscription;

	recipeList: StoreRecipe[] = [];

	constructor(private store: Store<State>) {
		this.recipeSubscription = this.store.select(getStoredRecipes).subscribe(firstStoreData => {
			this.recipeList = firstStoreData;
		});
	}

	ngOnInit() {}

	onEditRecipe() {}

	onDuplicateRecipe() {}

	onDeleteRecipe() {}

	ngOnDestroy() {
		this.recipeSubscription.unsubscribe();
	}
}
