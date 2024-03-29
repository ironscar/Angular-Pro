import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SocketStoreAppComponent } from './containers/socket-store-app/socket-store-app.component';
import { SocketDialogComponent } from './components/socket-dialog/socket-dialog.component';

@NgModule({
	declarations: [SocketStoreAppComponent, SocketDialogComponent],
	imports: [CommonModule, SharedModule],
	exports: [SocketStoreAppComponent]
})
export class SocketStoreModule {}

/**
 * export component so that SocketStoreModule, when imported into AppModule, can directly use the component
 */
