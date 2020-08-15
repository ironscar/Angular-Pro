import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as SecondStoreActions from '../actions/second-store.actions';

@Injectable()
export class SecondStoreEffects {
	constructor(private actions$: Actions) {}

	@Effect()
	firstStoreApiComplete = this.actions$.pipe(
		ofType(SecondStoreActions.SecondStoreActionTypes.BuyAllIngredients),
		switchMap((cartData: SecondStoreActions.BuyAllIngredients) => {
			return of(cartData.totalFormattedPrice).pipe(
				map(data => {
					console.log('paid ' + data);
					return new SecondStoreActions.ClearAllIngredients(false);
				})
			);
		})
	);
}

/**
 * Only added to have a single effect in the second module as well
 * Ngrx effects also provides Actions and ofType to be used in any class and not just Effects class
 * They can be used in any other class, check action type and so something with the observable
 * Resolvers may need observables and thus this can be used there with a take(1) to get latest
 * and then do a navigate to route etc
 */
