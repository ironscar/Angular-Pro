import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstStoreAppComponent } from './containers/first-store-app/first-store-app.component';

const routes: Routes = [{ path: '', component: FirstStoreAppComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FirstStoreRoutingModule {}
