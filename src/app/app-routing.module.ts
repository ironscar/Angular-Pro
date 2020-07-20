import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'dev', pathMatch: 'full' },
	{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}

/**
 * redirect matches paths by prefix but pathMatch full can match it by entire url instead
 * The ** must be at the end and specifies all routes not covered by paths above it
 * Since the ** needs to be the final route, AppRoutingModule must be added after all other modules which have routing modules
 * Those modules must also be ordered if there is a specific order among all those routes
 * RouterModule forRoot and forChild takes a useHash property which lets servers ignore it by putting angular routes after a hash
 */
