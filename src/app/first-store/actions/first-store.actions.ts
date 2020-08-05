import { Action } from '@ngrx/store';
import { StoreRecipe } from '../first-store.models';

export enum FirstStoreActionTypes {
	NewStoreRecipe = '[First Store] New Store Recipe',
	EditStoreRecipe = '[First Store] Edit Store Recipe',
	DuplicateStoreRecipe = '[First Store] Duplicate Store Recipe',
	DeleteStoreRecipe = '[First Store] Delete Store Recipe'
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

export type FirstStoreActions = NewStoreRecipe | EditStoreRecipe | DuplicateStoreRecipe | DeleteStoreRecipe;
