import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerComponent } from './dev/server/server.component';
import { ProfileComponent } from './dev/profile/profile.component';
import { DevComponent } from './dev/dev.component';
import { MainComponent } from './main/main.component';
import { ShoppingListComponent } from './main/shopping-list/shopping-list.component';
import { RecipeComponent } from './main/recipe/recipe.component';
import { ShoppingListEditComponent } from './main/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeItemComponent } from './main/recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './main/recipe/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './main/recipe/recipe-list/recipe-list.component';

@NgModule({
	declarations: [
		AppComponent,
		ServerComponent,
		ProfileComponent,
		DevComponent,
		MainComponent,
		ShoppingListComponent,
		RecipeComponent,
		ShoppingListEditComponent,
		RecipeItemComponent,
		RecipeDetailComponent,
		RecipeListComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		FlexLayoutModule,
		MatTabsModule,
		MatCardModule,
		MatButtonModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
