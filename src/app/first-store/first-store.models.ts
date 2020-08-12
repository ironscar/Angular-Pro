export interface StoreIngredient {
	ingredientName: string;
	ingredientQuantity: number;
}

export interface StoreRecipe {
	recipeName: string;
	recipeDescription: string;
	ingredients: StoreIngredient[];
}

export interface StoreUser {
	username: string;
	password: string;
}

/**
 * store all models per module (follow CTA structure)
 */
