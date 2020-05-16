import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
	selector: 'app-shopping-list-edit',
	templateUrl: './shopping-list-edit.component.html',
	styleUrls: ['./shopping-list-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListEditComponent implements OnInit {
	currentIngredient: Ingredient = { name: '', quantity: 0 };
	@Output() ingredientAdded = new EventEmitter<Ingredient>();
	@Output() ingredientDeleted = new EventEmitter<string>();
	@ViewChild('nameInput') nameInput: ElementRef;
	@ViewChild('qtyInput') qtyInput: ElementRef;

	constructor() {}

	ngOnInit(): void {}

	onAdd() {
		this.ingredientAdded.emit(new Ingredient(this.nameInput.nativeElement.value, this.qtyInput.nativeElement.value));
	}

	onClear() {
		this.currentIngredient.name = '';
		this.currentIngredient.quantity = 0;
	}

	onDelete() {
		this.ingredientDeleted.emit(this.nameInput.nativeElement.value);
	}
}
