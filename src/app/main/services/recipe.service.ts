import { Recipe } from '../recipe-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
	private recipes: Recipe[] = [
		new Recipe('Test recipe', 'this is a test recipe', 'https://randomimg.png', [
			new Ingredient('Apples', 5),
			new Ingredient('Sugar', 12)
		]),
		new Recipe('Test recipe 2', 'this is a test recipe 2', 'https://randomimg2.png', [
			new Ingredient('Capsicum', 5),
			new Ingredient('Onion', 3)
		])
	];
	private selectedRecipe: Recipe = null;
	private editingRecipe: Recipe = null;

	public selectedRecipeUpdated = new Subject<Recipe>();
	public startEditingRecipe = new Subject<Recipe>();

	constructor() {}

	setSelectedRecipe(recipe: Recipe) {
		this.editingRecipe = null;
		this.selectedRecipe = recipe;
		this.selectedRecipeUpdated.next(recipe);
	}

	setEditingRecipe(recipe: Recipe) {
		this.setSelectedRecipe(null);
		this.editingRecipe = recipe;
		this.startEditingRecipe.next(recipe);
	}

	addRecipe(newRecipe: Recipe) {
		this.recipes.push(newRecipe);
		this.setSelectedRecipe(newRecipe);
	}

	deleteRecipe(newRecipe: Recipe) {
		for (let i = 0; i < this.recipes.length; i++) {
			const recipe = this.recipes[i];
			if (recipe.name === newRecipe.name) {
				const lastRecipe = this.recipes[this.recipes.length - 1];
				this.recipes[i] = lastRecipe;
				this.recipes.pop();
				break;
			}
		}
	}

	getRecipeList() {
		return this.recipes;
	}

	getSelectedRecipe() {
		return this.selectedRecipe;
	}

	getEditingRecipe() {
		return this.editingRecipe;
	}
}
