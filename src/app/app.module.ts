import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerComponent } from './dev/server/server.component';
import { ProfileComponent } from './dev/profile/profile.component';
import { DevComponent } from './dev/dev.component';
import { MainComponent } from './main/main.component';
import { ShoppingListComponent } from './main/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './main/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeItemComponent } from './main/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './main/recipe-list/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './main/recipe-list/recipe-list.component';
import { BasicHighLightDirective } from './dev/directives/basic-highlight/basic-highlight.directive';
import { UnlessDirective } from './dev/directives/unless/unless.directive';
import { DropdownDirective } from './main/directives/dropdown.directive';
import { AccountListComponent } from './dev/account-list/account-list.component';
import { AccountComponent } from './dev/account-list/account/account.component';
import { NewAccountComponent } from './dev/account-list/new-account/new-account.component';
import { HomeComponent } from './home/home.component';
import { HomeChildComponent } from './home/home-child/home-child.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeEditComponent } from './main/recipe-list/recipe-edit/recipe-edit.component';
import { FormComponent } from './dev/form/form.component';
import { HttpPipeComponent } from './dev/http-pipe/http-pipe.component';
import { ShortenPipe } from './dev/pipes/shorten.pipe';
import { FilterPipe } from './dev/pipes/filter.pipe';
import { AuthInterceptorService } from './dev/services/auth-interceptor.service';

@NgModule({
	declarations: [
		AppComponent,
		ServerComponent,
		ProfileComponent,
		DevComponent,
		MainComponent,
		ShoppingListComponent,
		ShoppingListEditComponent,
		RecipeItemComponent,
		RecipeDetailComponent,
		RecipeListComponent,
		BasicHighLightDirective,
		UnlessDirective,
		DropdownDirective,
		AccountListComponent,
		AccountComponent,
		NewAccountComponent,
		HomeComponent,
		HomeChildComponent,
		PageNotFoundComponent,
		RecipeEditComponent,
		FormComponent,
		HttpPipeComponent,
		ShortenPipe,
		FilterPipe
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MatTabsModule,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatRadioModule,
		MatProgressSpinnerModule,
		HttpClientModule
	],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule {}
