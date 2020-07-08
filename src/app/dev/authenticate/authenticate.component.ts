import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
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

	constructor(private apiService: BackendApiService, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.loginSubscription = this.apiService.loginSubject.subscribe(data => {
			this.loginStatus = data;
			console.log(data);
			this.cdr.detectChanges();
		});
		this.apiService.setLoginOnLoad();
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
 */
