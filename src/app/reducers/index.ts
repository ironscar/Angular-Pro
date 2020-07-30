import * as fromFirstStore from '../first-store/reducers/first-store.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
	firstStore: fromFirstStore.State;
}

export const reducers: ActionReducerMap<State> = {
	firstStore: fromFirstStore.reducer
};

/** export all reducers and states (follow clock architect example) */
