export class Recipe {
	public name: string;
	public description: string;
	public imagePath: string;

	constructor(name: string, desc: string, url: string) {
		this.name = name;
		this.description = desc;
		this.imagePath = url;
	}
}
