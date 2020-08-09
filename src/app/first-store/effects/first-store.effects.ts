import { Actions, ofType } from '@ngrx/effects';
import * as FirstStoreActions from '../actions/first-store.actions';

export class FirstStoreEffects {
	constructor(private actions$: Actions) {}

	firstStoreApiStart = this.actions$.pipe(ofType(FirstStoreActions.FirstStoreActionTypes.FirstStoreApiStart));
}

/**
 * Include everything that doesn't directly affect the app state
 * These could be cookies, localStorage, async calls etc
 * the actions$ is a convention, some conventions specify all observables to have a $ suffix
 * ofType specifies for which action, the effect is being defined
 * ofType can take multiple types if same code needs to be run for them
 * Set up a new controller in back-end to show effects features
 */
