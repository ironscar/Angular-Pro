import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'dev', pathMatch: 'full' },
	{ path: 'dev', loadChildren: () => import('./dev/dev.module').then(m1 => m1.DevModule) },
	{ path: 'main', loadChildren: () => import('./main/main.module').then(m2 => m2.MainModule) },
	{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule]
})
export class AppRoutingModule {}

/**
 * redirect matches paths by prefix but pathMatch full can match it by entire url instead
 * The ** must be at the end and specifies all routes not covered by paths above it
 * Since the ** needs to be the final route, AppRoutingModule must be added after all other modules which have routing modules
 * ** default route for full app should not show up in SharedModule as it is included multiple times across multiple modules
 * Those modules must also be ordered if there is a specific order among all those routes
 * RouterModule forRoot and forChild takes a useHash property which lets servers ignore it by putting angular routes after a hash
 * Main/Dev Module is loaded here lazily as shown and must rerun 'ng serve' for it to take effect
 * Preload all Modules will first download only required modules and then when free,
 * it will download the others even if they aren't active yet (preload) so there is no lag when they are actually needed
 *
 * Look into how to make custom preloading strategies
 */
