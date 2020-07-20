import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';

@NgModule({
	declarations: [
		MainComponent,
		ShoppingListComponent,
		ShoppingListEditComponent,
		RecipeItemComponent,
		RecipeDetailComponent,
		RecipeEditComponent,
		RecipeListComponent,
		DropdownDirective
	],
	imports: [BrowserAnimationsModule, CommonModule, MainRoutingModule, SharedModule]
})
export class MainModule {}
