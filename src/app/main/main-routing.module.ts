import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{ component: MainComponent, path: '' },
			{ component: MainComponent, path: ':id' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule {}

/**
 * Main Module is loaded lazily and so everything here should be child routes of main
 * Don't include 'main' as part of path anymore
 */
