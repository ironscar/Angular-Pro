import { Action } from '@ngrx/store';
import { StoreRecipe } from 'src/app/first-store/first-store.models';

export enum SecondStoreActionTypes {
	GetAllRecipeIngredients = '[Second Store] Get All Recipe Ingredients',
	ClearAllIngredients = '[Second Store] Clear All Ingredients',
	UpdateOutdatedStatus = 'Second Store] Update Outdated Status',
	BuyAllIngredients = '[Second Store] Buy All Ingredients'
}

export class GetAllRecipeIngredients implements Action {
	readonly type = SecondStoreActionTypes.GetAllRecipeIngredients;
	constructor(public recipes: StoreRecipe[]) {}
}

export class ClearAllIngredients implements Action {
	readonly type = SecondStoreActionTypes.ClearAllIngredients;
	constructor(public currentStatus: boolean) {}
}

export class UpdateOutdatedStatus implements Action {
	readonly type = SecondStoreActionTypes.UpdateOutdatedStatus;
	constructor(public newStatus: boolean) {}
}

export class BuyAllIngredients implements Action {
	readonly type = SecondStoreActionTypes.BuyAllIngredients;
	constructor(public totalFormattedPrice: string) {}
}

export type SecondStoreActions = GetAllRecipeIngredients | ClearAllIngredients | UpdateOutdatedStatus | BuyAllIngredients;
