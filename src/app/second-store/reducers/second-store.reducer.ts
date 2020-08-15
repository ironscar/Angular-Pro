import { SecondStoreActions, SecondStoreActionTypes } from '../actions/second-store.actions';
import * as SecondStoreConstants from '../second-store.constants';
import { ShoppingIngredient } from '../second-store.models';

export interface State {
	shoppingList: Map<string, ShoppingIngredient>;
	message: string;
	totalPrice: number;
	outDated: boolean;
	payFrequency: number;
}

export const initialState: State = { shoppingList: null, message: '', totalPrice: 0, outDated: false, payFrequency: 0 };

export function reducer(state = initialState, action: SecondStoreActions) {
	switch (action.type) {
		case SecondStoreActionTypes.GetAllRecipeIngredients: {
			const newState = { ...state };
			const ingredientsMap = new Map<string, ShoppingIngredient>();
			const message = [];
			let price = 0;
			action.recipes.map(recipe => {
				recipe.ingredients.map(ingredient => {
					if (SecondStoreConstants.INGREDIENT_PRICE_MAP.has(ingredient.ingredientName)) {
						const unitPrice = SecondStoreConstants.INGREDIENT_PRICE_MAP.get(ingredient.ingredientName);
						const totalPricePerIngredient = ingredient.ingredientQuantity * unitPrice;
						price += totalPricePerIngredient;
						if (ingredientsMap.has(ingredient.ingredientName)) {
							const includedIngredient = ingredientsMap.get(ingredient.ingredientName);
							includedIngredient.ingredientQuantity += ingredient.ingredientQuantity;
							includedIngredient.totalPrice += totalPricePerIngredient;
							console.log(ingredientsMap.get(ingredient.ingredientName), includedIngredient);
						} else {
							ingredientsMap.set(ingredient.ingredientName, {
								ingredientName: ingredient.ingredientName,
								ingredientQuantity: ingredient.ingredientQuantity,
								totalPrice: totalPricePerIngredient
							});
						}
					} else {
						message.push(ingredient.ingredientName);
					}
				});
			});
			newState.shoppingList = ingredientsMap;
			if (message.length === 1) {
				newState.message = message[0] + ' is not available';
			} else if (message.length > 1) {
				newState.message = message.join(', ') + 'are not available';
			} else {
				newState.message = '';
			}
			newState.totalPrice = price;
			newState.outDated = false;
			return newState;
		}
		case SecondStoreActionTypes.UpdateOutdatedStatus: {
			const newState = { ...state };
			newState.outDated = action.newStatus;
			return newState;
		}
		case SecondStoreActionTypes.ClearAllIngredients: {
			const newState = { ...state };
			newState.message = '';
			newState.shoppingList = null;
			newState.totalPrice = 0;
			newState.outDated = action.currentStatus;
			return newState;
		}
		case SecondStoreActionTypes.BuyAllIngredients: {
			const newState = { ...state };
			newState.payFrequency++;
			console.log('bought in reducer');
			return newState;
		}
		default:
			return state;
	}
}

/**
 * notice in what order the reducer calls 'buy' and freq update happens on comp
 * compared to the effect calls 'buy' and every other update happens
 */
