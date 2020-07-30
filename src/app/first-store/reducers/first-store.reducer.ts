import { StoreRecipe } from '../first-store.models';
import { INITIAL_RECIPE_STORE_LIST } from '../first-store.constants';

export interface State {
	recipeList: StoreRecipe[];
}

export const initialState: State = { recipeList: INITIAL_RECIPE_STORE_LIST };

export function reducer(state = initialState, action) {
	return state;
}

/**
 * Give it some initial state and populate in first-store
 * Then see what can be added in second-store
 */
