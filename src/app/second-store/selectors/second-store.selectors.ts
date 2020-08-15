import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/second-store.reducer';

export const getSecondStoreState = createFeatureSelector<State>('secondStore');

export const getIngredientList = createSelector(getSecondStoreState, state => state.shoppingList);

export const getShoppingAlert = createSelector(getSecondStoreState, state => state.message);

export const getTotalPrice = createSelector(getSecondStoreState, state => state.totalPrice);

export const getOutdatedStatus = createSelector(getSecondStoreState, state => state.outDated);

export const getShoppingFrequency = createSelector(getSecondStoreState, state => state.payFrequency);
