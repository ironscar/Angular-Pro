import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevModule } from './dev/dev.module';
import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, BrowserAnimationsModule, DevModule, MainModule, SharedModule, AppRoutingModule],
	bootstrap: [AppComponent]
})
export class AppModule {}
