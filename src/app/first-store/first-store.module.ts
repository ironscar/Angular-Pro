import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstStoreRoutingModule } from './first-store-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FirstStoreAppComponent } from './containers/first-store-app/first-store-app.component';

@NgModule({
	declarations: [FirstStoreAppComponent],
	imports: [CommonModule, FirstStoreRoutingModule, SharedModule]
})
export class FirstStoreModule {}
