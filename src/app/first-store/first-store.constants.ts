import { StoreRecipe } from './first-store.models';

export const INITIAL_RECIPE_STORE_LIST: StoreRecipe[] = [
	{
		recipeName: 'Recipe A',
		recipeDescription: 'The first initial recipe',
		ingredients: [
			{
				ingredientName: 'Apple',
				ingredientQuantity: 2
			},
			{
				ingredientName: 'Sugar',
				ingredientQuantity: 5
			}
		]
	},
	{
		recipeName: 'Recipe B',
		recipeDescription: 'The second initial recipe',
		ingredients: [
			{
				ingredientName: 'Onion',
				ingredientQuantity: 5
			},
			{
				ingredientName: 'Capsicum',
				ingredientQuantity: 1
			}
		]
	},
	{
		recipeName: 'Recipe C',
		recipeDescription: 'The third initial recipe',
		ingredients: [
			{
				ingredientName: 'Cheese',
				ingredientQuantity: 1
			},
			{
				ingredientName: 'Chilli',
				ingredientQuantity: 3
			}
		]
	}
];

/**
 * store all constants per module (follow CTA structure)
 */
