import { StoreRecipe } from '../first-store.models';
import { INITIAL_RECIPE_STORE_LIST } from '../first-store.constants';
import { FirstStoreActionTypes, FirstStoreActions } from '../actions/first-store.actions';

export interface State {
	loggedInUser: string;
	callingApi: boolean;
	recipeList: StoreRecipe[];
}

export const initialState: State = { loggedInUser: 'UNDEF', callingApi: false, recipeList: INITIAL_RECIPE_STORE_LIST };

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
		case FirstStoreActionTypes.FirstStoreApiStart: {
			const newState = { ...state };
			newState.callingApi = true;
			return newState;
		}
		case FirstStoreActionTypes.FirstStoreApiError: {
			const newState = { ...state };
			newState.loggedInUser = action.error;
			newState.callingApi = false;
			return newState;
		}
		case FirstStoreActionTypes.FirstStoreApiSuccess: {
			const newState = { ...state };
			newState.loggedInUser = action.loggedInUsername;
			newState.callingApi = false;
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
 * Actions which are handled in effects are not required in the reducer
 * However, if you need to update the state, you may have it in the reducer
 * Here loginStart isn't required but we update the callingApi telling you when call is made and finished
 */
