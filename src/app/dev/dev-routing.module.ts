import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevComponent } from './dev.component';

const routes: Routes = [
	{
		path: '',
		component: DevComponent,
		children: [
			{ component: DevComponent, path: '' },
			{ component: DevComponent, path: ':id' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DevRoutingModule {}

/*
 * for child is done for feature modules and for root is only done for root module
 * Dynamic params (:id) should always come after the normal ones with same value upto there
 *
 * The dynamic param part stopped working later on but query and hash still work
 */
