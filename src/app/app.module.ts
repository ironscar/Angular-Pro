import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { SocketStoreModule } from './socket-store/socket-store.module';

import { AppComponent } from './app.component';
import { reducers, effects } from './reducers';
import { environment } from 'src/environments/environment';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		BrowserAnimationsModule,
		HttpClientModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot(effects),
		environment.development ? StoreDevtoolsModule.instrument() : [],
		StoreRouterConnectingModule.forRoot(),
		SharedModule,
		AppRoutingModule,
		SocketStoreModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

/**
 * Feature Modules store a specific feature as an independent module
 * Shared Modules store and export all shared components, directives, pipes and modules
 * Core Modules store application-wide services which were in the app module providers array
 * Core modules don't need exports as services are available to all modules as is
 * Main/Dev module is not imported here anymore as it is lazily loaded in app routing module
 * Import BrowserModule, BrowserAnimationsModule only once in app module else it can cause errors during lazy loading
 * Just in time compilation is when angular compiler runs in the browser but this is faster to build, slower in browser
 * Ahead of time compilation is when the compiler compiles the code into js during build but its slower in build, faster in browser
 * Store module provided with all reducers and store devtools dded only for dev env
 * Effects module added with forRoot whuch takes in an array of all effects classes exported from src/reducers/index.ts
 * StoreDevtools added only for dev env and works with the Redux extension
 * StoreRouterConnectingModule dispatches actions based on routing and you can react to those accordingly
 * It takes a forRoot with no arguments by default but can specify further options
 * withServerTransition for BrowserModule is added due to angular universal - check out AppServerModule which is created for universal
 */
