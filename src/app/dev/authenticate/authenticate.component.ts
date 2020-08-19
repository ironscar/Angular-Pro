import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';

import { BackendApiService } from '../services/backend-api.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-authenticate',
	templateUrl: './authenticate.component.html',
	styleUrls: ['./authenticate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticateComponent implements OnInit, OnDestroy {
	loginMode = true;
	loginStatus: string = null;
	loginSubscription: Subscription;

	@ViewChild('authForm') authForm: NgForm;

	constructor(private apiService: BackendApiService, private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId) {}

	ngOnInit() {
		this.loginSubscription = this.apiService.loginSubject.subscribe(data => {
			this.loginStatus = data;
			console.log(data);
			this.cdr.detectChanges();
		});
		if (isPlatformBrowser(this.platformId)) {
			this.apiService.setLoginOnLoad();
		} else {
			console.log('on server with angular universal');
		}
	}

	onSwitchMode() {
		this.loginMode = !this.loginMode;
	}

	onLoginSubmit() {
		console.log(this.authForm.value);
		if (this.loginMode) {
			this.apiService.getLoginStatus(this.authForm.value.username, this.authForm.value.password);
		} else {
			this.apiService.addAuthUser(this.authForm.value.username, this.authForm.value.password);
		}
		this.authForm.resetForm();
	}

	onLogOff() {
		this.loginStatus = null;
		this.apiService.logOff();
	}

	ngOnDestroy() {
		this.loginSubscription.unsubscribe();
	}
}

/**
 * Log in disabled if already logged in
 * get from local storage with setLoginOnLoad after subscription so as to update status with subject
 *
 * Login on load disabled if app on server as it uses localStorage which would fail on server
 * platformId is injected as shown and used in isPlatformBrowser() or isPlatformServer() to tell where it is run
 * This is useful for angular Universal
 */
