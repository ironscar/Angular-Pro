import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-authenticate',
	templateUrl: './authenticate.component.html',
	styleUrls: ['./authenticate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticateComponent implements OnInit {
	loginMode = false;

	@ViewChild('authForm') authForm: NgForm;

	constructor() {}

	ngOnInit() {}

	onSwitchMode() {
		this.loginMode = !this.loginMode;
	}

	onLoginSubmit() {
		console.log(this.authForm.value);
		this.authForm.resetForm();
	}
}
