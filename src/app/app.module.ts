import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerComponent } from './dev/server/server.component';
import { ProfileComponent } from './dev/profile/profile.component';
import { DevComponent } from './dev/dev.component';
import { MainComponent } from './main/main.component';

@NgModule({
	declarations: [AppComponent, ServerComponent, ProfileComponent, DevComponent, MainComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
