import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecondStoreAppComponent } from './containers/second-store-app/second-store-app.component';

const routes: Routes = [{ path: '', component: SecondStoreAppComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SecondStoreRoutingModule {}
