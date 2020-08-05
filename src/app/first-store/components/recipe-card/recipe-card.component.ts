import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { StoreRecipe } from '../../first-store.models';

@Component({
	selector: 'app-recipe-card',
	templateUrl: './recipe-card.component.html',
	styleUrls: ['./recipe-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCardComponent implements OnInit {
	@Input() storeRecipe: StoreRecipe;

	@Output() editRecipeEmitter = new EventEmitter<void>();
	@Output() duplicateRecipeEmitter = new EventEmitter<void>();
	@Output() deleteRecipeEmitter = new EventEmitter<void>();

	constructor() {}

	ngOnInit() {}

	onEditRecipe() {
		this.editRecipeEmitter.emit();
	}

	onDuplicateRecipe() {
		this.duplicateRecipeEmitter.emit();
	}

	onDeleteRecipe() {
		this.deleteRecipeEmitter.emit();
	}
}
