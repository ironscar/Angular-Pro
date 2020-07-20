import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthLoginService {
	private loggedIn = false;

	login() {
		this.loggedIn = true;
	}

	logout() {
		this.loggedIn = false;
	}

	isAuthenticated() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.loggedIn);
			}, 800);
		});
	}
}
