import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as FirstStoreActions from '../actions/first-store.actions';

@Injectable()
export class FirstStoreEffects {
	apiUrl = 'http://localhost:8080';

	constructor(private actions$: Actions, private httpClient: HttpClient) {}

	@Effect()
	firstStoreApiStart = this.actions$.pipe(
		ofType(FirstStoreActions.FirstStoreActionTypes.FirstStoreApiStart),
		switchMap((authData: FirstStoreActions.FirstStoreApiStart) => {
			// api request
			return this.httpClient
				.post(
					this.apiUrl + '/login',
					{
						id: null,
						username: authData.user.username,
						password: authData.user.password
					},
					{
						responseType: 'text'
					}
				)
				.pipe(
					map(responseData => {
						// handle response and return non-erroneous observable
						console.log(responseData);
						return new FirstStoreActions.FirstStoreApiSuccess(responseData);
					}),
					catchError(error => {
						// handle error and return non-erroneous observable
						console.log(error);
						return of(new FirstStoreActions.FirstStoreApiError('N'));
					})
				);
		})
	);
}

/**
 * Include everything that doesn't directly affect the app state
 * These could be cookies, localStorage, async calls etc
 * the actions$ is a convention, some conventions specify all observables to have a $ suffix
 * ofType specifies for which action, the effect is being defined
 * ofType can take multiple types if same code needs to be run for them
 * of returns a new observable which is used so that the switchMap observable never fails
 * Once an observable fails, it will never work again so this is important to remember
 * The @Effect deorator tends to treat the observable as a new action so dispatch is not needed
 * map comes in before catchError as no observable fails and catchError should stop map
 * map shouldn't try to handle the catchError observable
 * HttpClientModule has to be imported at the place where Effects module is described
 * It won't work if HttpClientModule is in the feature module and not in root module where effects module is
 * map could return an http response directly as its already an observable, if its not, use of() as done in catchError
 * Don't send the http observable as another observable inside map though as that breaks things
 */
