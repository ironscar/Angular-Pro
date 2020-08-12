import * as fromFirstStore from '../first-store/reducers/first-store.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { FirstStoreEffects } from '../first-store/effects/first-store.effects';

export interface State {
	firstStore: fromFirstStore.State;
}

export const reducers: ActionReducerMap<State> = {
	firstStore: fromFirstStore.reducer
};

export const effects: any[] = [FirstStoreEffects];

/** export all reducers, states and effects (follow clock architect example) */
