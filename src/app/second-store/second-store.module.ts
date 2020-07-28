import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondStoreRoutingModule } from './second-store-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SecondStoreAppComponent } from './containers/second-store-app/second-store-app.component';

@NgModule({
	declarations: [SecondStoreAppComponent],
	imports: [CommonModule, SecondStoreRoutingModule, SharedModule]
})
export class SecondStoreModule {}
