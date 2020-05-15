import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements OnInit {
	recipes: Recipe[] = [
		new Recipe('Test recipe', 'this is a test recipe', 'https://randomimg.png'),
		new Recipe('Test recipe 2', 'this is a test recipe 2', 'https://randomimg2.png')
	];

	constructor() {}

	ngOnInit(): void {}
}
