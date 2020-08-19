import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
	imports: [AppModule, ServerModule],
	bootstrap: [AppComponent]
})
export class AppServerModule {}

/**
 * To get angular universal: run "ng add @nguniversal/express-engine --clientProject angular-pro"
 * Updates app-module, app-routing-module, main.ts, angular.json, package.json
 * Creates app-server-module, main.server.ts, server.ts, tsconfig.server.ts
 * Universal cannot run browser specific actions on server so we have to disable them by injecting platformId
 * This is done in auth component in dev module
 * Package json adds new scripts with ssr suffix to run/build as angular universal
 *
 * Now it serves app with nodeJs and thus needs a dynamic server, not a static server serving only html 5
 * You run serve:ssr on server or in dev env, open universal app on localhost 4000 by default
 * On inspecting page source, you can see app-first store and app-root html content whereas normally you will only see app-root
 * Angular universal only works with NodeJS
 */
