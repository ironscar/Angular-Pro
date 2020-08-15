import * as fromFirstStore from '../first-store/reducers/first-store.reducer';
import * as fromSecondStore from '../second-store/reducers/second-store.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { FirstStoreEffects } from '../first-store/effects/first-store.effects';
import { SecondStoreEffects } from '../second-store/effects/second-store.effects';

export interface State {
	firstStore: fromFirstStore.State;
	secondStore: fromSecondStore.State;
}

export const reducers: ActionReducerMap<State> = {
	firstStore: fromFirstStore.reducer,
	secondStore: fromSecondStore.reducer
};

export const effects: any[] = [FirstStoreEffects, SecondStoreEffects];

/** export all reducers, states and effects (follow clock architect example) */
