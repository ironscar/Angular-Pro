import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent implements OnInit {
	@Input() recipe: Recipe;

	constructor() {}

	ngOnInit(): void {}
}
