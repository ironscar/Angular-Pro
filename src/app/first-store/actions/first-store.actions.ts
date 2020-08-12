import { Action } from '@ngrx/store';
import { StoreRecipe, StoreUser } from '../first-store.models';

export enum FirstStoreActionTypes {
	// standard actions
	NewStoreRecipe = '[First Store] New Store Recipe',
	EditStoreRecipe = '[First Store] Edit Store Recipe',
	DuplicateStoreRecipe = '[First Store] Duplicate Store Recipe',
	DeleteStoreRecipe = '[First Store] Delete Store Recipe',
	FirstStoreApiError = '[First Store] API Error',
	FirstStoreApiSuccess = '[First Store] API Success',
	// effect actions
	FirstStoreApiStart = '[First Store] API Start'
}

export class NewStoreRecipe implements Action {
	readonly type = FirstStoreActionTypes.NewStoreRecipe;
	constructor(public newRecipe: StoreRecipe) {}
}

export class EditStoreRecipe implements Action {
	readonly type = FirstStoreActionTypes.EditStoreRecipe;
	constructor(public indexToEdit: number, public editedRecipe: StoreRecipe) {}
}

export class DuplicateStoreRecipe implements Action {
	readonly type = FirstStoreActionTypes.DuplicateStoreRecipe;
	constructor(public indexToDuplicate: number) {}
}

export class DeleteStoreRecipe implements Action {
	readonly type = FirstStoreActionTypes.DeleteStoreRecipe;
	constructor(public indexToDelete: number) {}
}

export class FirstStoreApiStart implements Action {
	readonly type = FirstStoreActionTypes.FirstStoreApiStart;
	constructor(public user: StoreUser) {}
}

export class FirstStoreApiError implements Action {
	readonly type = FirstStoreActionTypes.FirstStoreApiError;
	constructor(public error: string) {}
}

export class FirstStoreApiSuccess implements Action {
	readonly type = FirstStoreActionTypes.FirstStoreApiSuccess;
	constructor(public loggedInUsername: string) {}
}

export type FirstStoreActions =
	| NewStoreRecipe
	| EditStoreRecipe
	| DuplicateStoreRecipe
	| DeleteStoreRecipe
	| FirstStoreApiStart
	| FirstStoreApiError
	| FirstStoreApiSuccess;

/**
 * The action types should be unique as they are forwarded to all reducers and not just first store reducer
 * So we prefix it with the module name
 */
