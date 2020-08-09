import { StoreRecipe } from '../first-store.models';
import { INITIAL_RECIPE_STORE_LIST } from '../first-store.constants';
import { FirstStoreActionTypes, FirstStoreActions } from '../actions/first-store.actions';

export interface State {
	recipeList: StoreRecipe[];
}

export const initialState: State = { recipeList: INITIAL_RECIPE_STORE_LIST };

export function reducer(state = initialState, action: FirstStoreActions) {
	switch (action.type) {
		case FirstStoreActionTypes.NewStoreRecipe: {
			const newState = { ...state };
			newState.recipeList = [...state.recipeList, action.newRecipe];
			return newState;
		}
		case FirstStoreActionTypes.EditStoreRecipe: {
			const newState = { ...state };
			newState.recipeList = [...state.recipeList];
			newState.recipeList[action.indexToEdit] = action.editedRecipe;
			return newState;
		}
		case FirstStoreActionTypes.DuplicateStoreRecipe: {
			const newState = { ...state };
			const duplicatedRecipe = { ...state.recipeList[action.indexToDuplicate] };
			duplicatedRecipe.ingredients = [...state.recipeList[action.indexToDuplicate].ingredients];
			newState.recipeList = [...state.recipeList, duplicatedRecipe];
			return newState;
		}
		case FirstStoreActionTypes.DeleteStoreRecipe: {
			const newState = { ...state };
			const newRecipes = [...state.recipeList];
			newRecipes.splice(action.indexToDelete, 1);
			newState.recipeList = newRecipes;
			return newState;
		}
		default:
			return state;
	}
}

/**
 * Give it some initial state and populate in first-store
 * Splice returns removed item and removes specified item from original array
 * Async code in reducer will break the reducer and musn't be done
 */
