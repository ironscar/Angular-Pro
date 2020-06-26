import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { UserRecord } from '../http-pipe/user.interface';

@Injectable()
export class BackendApiService {
	private apiUrl = 'http://localhost:8080';

	responseSubject = new Subject<{ type: string; users: UserRecord[] }>();
	errorSubject = new Subject<string>();

	constructor(private httpClient: HttpClient) {}

	getAllUsers() {
		this.httpClient.get<UserRecord[]>(this.apiUrl + '/users').subscribe(
			responseData => {
				console.log(responseData);
				if (responseData) {
					this.responseSubject.next({ type: 'all', users: responseData });
				}
			},
			(error: HttpErrorResponse) => {
				console.log(error);
				this.errorSubject.next(error.statusText);
			}
		);
	}

	getExistingUser(userId: number) {
		this.httpClient.get<UserRecord>(this.apiUrl + '/users/' + userId).subscribe(
			responseData => {
				console.log(responseData);
				if (responseData) {
					this.responseSubject.next({ type: 'one', users: [responseData] });
				}
			},
			(error: HttpErrorResponse) => {
				console.log(error);
				this.errorSubject.next(error.statusText);
			}
		);
	}

	createNewUser(newUser: UserRecord) {
		this.httpClient.post(this.apiUrl + '/users', newUser).subscribe(
			responseData => {
				console.log(responseData);
				this.getAllUsers();
			},
			(error: HttpErrorResponse) => {
				console.log(error);
				this.errorSubject.next(error.statusText);
			}
		);
	}

	updateUser(newUser: UserRecord) {
		this.httpClient.put(this.apiUrl + '/users/' + newUser.id, newUser).subscribe(
			responseData => {
				console.log(responseData);
				this.getAllUsers();
			},
			(error: HttpErrorResponse) => {
				console.log(error);
				this.errorSubject.next(error.statusText);
			}
		);
	}

	deleteUser(userId: number) {
		this.httpClient.delete(this.apiUrl + '/users/' + userId).subscribe(
			responseData => {
				console.log(responseData);
				this.getAllUsers();
			},
			(error: HttpErrorResponse) => {
				console.log(error);
				this.errorSubject.next(error.statusText);
			}
		);
	}
}

/**
 * The errors can happen if service is not available on localhost:8080
 */
