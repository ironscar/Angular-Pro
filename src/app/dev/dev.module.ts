import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DevRoutingModule } from './dev-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerComponent } from './server/server.component';
import { ProfileComponent } from './profile/profile.component';
import { DevComponent } from './dev.component';
import { BasicHighLightDirective } from './directives/basic-highlight/basic-highlight.directive';
import { UnlessDirective } from './directives/unless/unless.directive';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountComponent } from './account-list/account/account.component';
import { NewAccountComponent } from './account-list/new-account/new-account.component';
import { FormComponent } from './form/form.component';
import { HttpPipeComponent } from './http-pipe/http-pipe.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { BackendApiService } from './services/backend-api.service';
import { DynamicComponent } from './dynamic/dynamic.component';
import { DynamicAlertComponent } from './dynamic/dynamic-alert/dynamic-alert.component';
import { PlaceholderDirective } from './directives/placeholder/placeholder.directive';

@NgModule({
	declarations: [
		ServerComponent,
		ProfileComponent,
		DevComponent,
		BasicHighLightDirective,
		UnlessDirective,
		AccountListComponent,
		AccountComponent,
		NewAccountComponent,
		FormComponent,
		HttpPipeComponent,
		ShortenPipe,
		FilterPipe,
		AuthenticateComponent,
		DynamicComponent,
		DynamicAlertComponent,
		PlaceholderDirective
	],
	imports: [BrowserAnimationsModule, CommonModule, HttpClientModule, DevRoutingModule, SharedModule],
	providers: [BackendApiService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class DevModule {}

/**
 * Services can work across multiple modules but everything else is module specific
 * Those components/directives/pipes must be exported to be used by other modules
 */
