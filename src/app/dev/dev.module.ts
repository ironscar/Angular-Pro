import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DevRoutingModule } from './dev-routing.module';

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
import { AngularAnimsComponent } from './angular-anims/angular-anims.component';
import { WebWorkerComponent } from './web-worker/web-worker.component';
import { DataVizComponent } from './data-viz/data-viz.component';
import { TestComponent } from './test/test.component';
import { UserComponent } from './test/user/user.component';

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
		PlaceholderDirective,
		AngularAnimsComponent,
		WebWorkerComponent,
		DataVizComponent,
		TestComponent,
		UserComponent
	],
	imports: [CommonModule, HttpClientModule, DevRoutingModule, SharedModule],
	providers: [BackendApiService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class DevModule {}

/**
 * Those components/directives/pipes must be exported to be used by other modules
 * Services can work across multiple modules but everything else is module specific
 * In lazy loaded module, the service has one instance only in that module
 * If same service added into app module, then lazy loaded module will have a separate instance
 * In eager loaded module or app module, service has one instance across application
 * Services in component are available to all children thereof
 * Injectable providedIn root is same as adding it to app module providers
 * Ideally add services to app module only unless different instances are needed
 * If shared module is eagerly loaded inside an eagerly loaded and a lazy loaded module,
 * then services in both are still different instances due to the lazy loaded module
 * To get same instance of services across lazy and eager modules, add them to app module
 */
