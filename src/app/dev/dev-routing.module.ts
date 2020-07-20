import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevComponent } from './dev.component';

const routes: Routes = [
	{ component: DevComponent, path: 'dev' },
	{ component: DevComponent, path: 'dev/:id' }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DevRoutingModule {}

/*
 * for child is done for feature modules and for root is only done for root module
 * Dynamic params (:id) should always come after the normal ones with same value upto there
 */
