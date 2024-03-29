import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';

import { SharedRoutingModule } from './shared-routing.module';

import { HomeComponent } from './home/home.component';
import { HomeChildComponent } from './home/home-child/home-child.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
	declarations: [HomeComponent, HomeChildComponent, PageNotFoundComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MatTabsModule,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatRadioModule,
		MatDialogModule,
		MatStepperModule,
		MatProgressSpinnerModule,
		SharedRoutingModule
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MatTabsModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatRadioModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		MatStepperModule
	]
})
export class SharedModule {}

/**
 * Can declare a component only once and then import across other modules
 * Common Module includes ngIf and ngFor directives
 */
