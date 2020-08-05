import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstStoreRoutingModule } from './first-store-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FirstStoreAppComponent } from './containers/first-store-app/first-store-app.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeEditDialogComponent } from './components/recipe-edit-dialog/recipe-edit-dialog.component';

@NgModule({
	declarations: [FirstStoreAppComponent, RecipeCardComponent, RecipeEditDialogComponent],
	imports: [CommonModule, FirstStoreRoutingModule, SharedModule],
	entryComponents: [RecipeEditDialogComponent]
})
export class FirstStoreModule {}
