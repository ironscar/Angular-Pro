import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-shopping-list-edit',
	templateUrl: './shopping-list-edit.component.html',
	styleUrls: ['./shopping-list-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListEditComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
