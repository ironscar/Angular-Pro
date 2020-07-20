import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingService {
	private ingredients: Ingredient[] = [new Ingredient('test ingredient 1', 5), new Ingredient('test ingredient 2', 3)];
	public recipeIngredsAdded = new Subject<void>();

	constructor() {}

	getIngredients() {
		return this.ingredients;
	}

	onAddIngredientList(newIngredients: Ingredient[], routeToShoppingList: boolean = false) {
		for (const ingredient of newIngredients) {
			this.onAddIngredient({ ...ingredient });
		}
		if (routeToShoppingList) {
			this.recipeIngredsAdded.next();
		}
	}

	onAddIngredient(newIngredient: Ingredient) {
		let exists = false;
		for (const ingredient of this.ingredients) {
			if (ingredient.name === newIngredient.name) {
				ingredient.quantity += newIngredient.quantity;
				exists = true;
				break;
			}
		}
		if (!exists) {
			this.ingredients.push(newIngredient);
		}
	}

	onDeleteIngredient(name: string) {
		for (let i = 0; i < this.ingredients.length; i++) {
			const ingredient = this.ingredients[i];
			if (ingredient.name === name) {
				const lastIngredient = this.ingredients[this.ingredients.length - 1];
				this.ingredients[i] = lastIngredient;
				this.ingredients.pop();
				break;
			}
		}
	}
}
