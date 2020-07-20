import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeChildComponent } from './home/home-child/home-child.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { ResolverService } from './services/resolver.service';

const routes: Routes = [
	{
		component: HomeComponent,
		path: 'home',
		children: [
			{ component: HomeChildComponent, path: 'child/:id', canDeactivate: [CanDeactivateGuard], resolve: { child: ResolverService } }
		],
		// canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService]
	},
	{ component: PageNotFoundComponent, path: 'not-found', data: { message: 'Page not found' } }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SharedRoutingModule {}

/*
 * canActivate will take an array of all guards and guards route and all its children
 * canActivateChild is similar but guards only the children, not the route
 * the data member can pass random static data as an object for specific routes
 * resolvers take an object as it binds a particular resolver to the data object with specified key
 * RouterModule forRoot and forChild takes a useHash property which lets servers ignore it by putting angular routes after a hash
 */
