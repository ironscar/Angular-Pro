import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevComponent } from './dev/dev.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { HomeChildComponent } from './home/home-child/home-child.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './dev/services/auth-guard.service';
import { CanDeactivateGuard } from './dev/services/can-deactivate-guard.service';
import { ResolverService } from './dev/services/resolver.service';

const routes: Routes = [
	{ path: '', redirectTo: 'dev', pathMatch: 'full' },
	{
		component: HomeComponent,
		path: 'home',
		children: [
			{ component: HomeChildComponent, path: 'child/:id', canDeactivate: [CanDeactivateGuard], resolve: { child: ResolverService } }
		],
		// canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService]
	},
	{ component: DevComponent, path: 'dev' },
	{ component: DevComponent, path: 'dev/:id' },
	{ component: MainComponent, path: 'main' },
	{ component: MainComponent, path: 'main/:id' },
	{ component: PageNotFoundComponent, path: 'not-found', data: { message: 'Page not found' } },
	{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}

/*
 * The ** must be at the end and specifies all routes not covered by paths above it
 * redirect matches paths by prefix but pathMatch full can match it by entire url instead
 * canActivate will take an array of all guards and guards route and all its children
 * canActivateChild is similar but guards only the children, not the route
 * the data member can pass random static data as an object for specific routes
 * resolvers take an object as it binds a particular resolver to the data object with specified key
 * RouterModule forRoot takes a useHash property which lets servers ignore it by putting angular routes after a hash
 * Dynamic params (:id) should always come after the normal ones
 */
