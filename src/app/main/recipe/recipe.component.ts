import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
