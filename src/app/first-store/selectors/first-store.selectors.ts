import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/first-store.reducer';

export const getFirstStoreState = createFeatureSelector<State>('firstStore');

export const getStoredRecipes = createSelector(getFirstStoreState, state => state.recipeList);

export const getLoggedInUsername = createSelector(getFirstStoreState, state => state.loggedInUser);

/**
 * All the ways data can be selected from containers (like in CTA)
 */
