import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
	public name: string;
	public description: string;
	public imagePath: string;
	public ingredients: Ingredient[];

	constructor(name: string, desc: string, url: string, ingredients: Ingredient[]) {
		this.name = name;
		this.description = desc;
		this.imagePath = url;
		this.ingredients = ingredients;
	}
}
