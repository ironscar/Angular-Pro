import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../../services/shopping.service';

@Component({
	selector: 'app-shopping-list-edit',
	templateUrl: './shopping-list-edit.component.html',
	styleUrls: ['./shopping-list-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListEditComponent implements OnInit {
	currentIngredient: Ingredient = { name: '', quantity: 0 };
	@ViewChild('nameInput') nameInput: ElementRef;
	@ViewChild('qtyInput') qtyInput: ElementRef;

	constructor(private shoppingService: ShoppingService) {}

	ngOnInit(): void {}

	onAdd() {
		this.shoppingService.onAddIngredient(new Ingredient(this.nameInput.nativeElement.value, Number(this.qtyInput.nativeElement.value)));
		this.onClear();
	}

	onClear() {
		this.currentIngredient.name = '';
		this.currentIngredient.quantity = 0;
	}

	onDelete() {
		this.shoppingService.onDeleteIngredient(this.nameInput.nativeElement.value);
	}
}
