import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { UserRecord } from '../http-pipe/user.interface';

@Injectable()
export class BackendApiService {
	private apiUrl = 'http://localhost:8080';
	private login = 'N';

	loginSubject = new Subject<string>();
	responseSubject = new Subject<{ type: string; users: UserRecord[] }>();
	errorSubject = new Subject<string>();

	constructor(private httpClient: HttpClient) {}

	logOff() {
		this.login = 'N';
	}

	addAuthUser(username: string, password: string) {
		this.httpClient
			.post(
				this.apiUrl + '/register',
				{ id: null, username, password },
				{
					responseType: 'text'
				}
			)
			.subscribe(
				responseData => {
					if (responseData) {
						console.log(responseData);
						this.login = responseData;
						this.loginSubject.next(this.login);
					}
				},
				(error: HttpErrorResponse) => {
					this.login = 'N';
					this.loginSubject.next(this.login);
					console.log(error);
				}
			);
	}

	getLoginStatus(username: string, password: string) {
		this.httpClient
			.post(
				this.apiUrl + '/login',
				{ id: null, username, password },
				{
					responseType: 'text'
				}
			)
			.subscribe(
				responseData => {
					if (responseData) {
						console.log(responseData);
						this.login = responseData;
						this.loginSubject.next(this.login);
					}
				},
				(error: HttpErrorResponse) => {
					this.login = 'N';
					this.loginSubject.next(this.login);
					console.log(error);
				}
			);
	}

	getAllUsers() {
		// query params (immutable so reassign on return)
		let queryParams = new HttpParams();
		queryParams = queryParams.append('get', 'all');
		queryParams = queryParams.append('apptype', 'json');

		// api request
		this.httpClient
			.get<UserRecord[]>(this.apiUrl + '/users', {
				headers: new HttpHeaders({ 'Custom-Header': 'Hello Header' }),
				params: queryParams,
				observe: 'response',
				responseType: 'json'
			})
			.subscribe(
				responseData => {
					console.log(responseData);
					if (responseData.body) {
						this.responseSubject.next({ type: 'all', users: responseData.body });
					}
				},
				(error: HttpErrorResponse) => {
					console.log(error);
					this.errorSubject.next(error.statusText);
				}
			);
	}

	getExistingUser(userId: number) {
		this.httpClient
			.get<UserRecord>(this.apiUrl + '/users/' + userId, {
				headers: new HttpHeaders({ loginUser: this.login })
			})
			.subscribe(
				responseData => {
					console.log(responseData);
					if (responseData) {
						this.responseSubject.next({ type: 'one', users: [responseData] });
					}
				},
				(error: HttpErrorResponse) => {
					console.log(error);
					if (error.status === 401) {
						this.errorSubject.next('UNAUTHORIZED');
					} else {
						this.errorSubject.next(error.statusText);
					}
				}
			);
	}

	createNewUser(newUser: UserRecord) {
		this.httpClient
			.post(this.apiUrl + '/users', newUser, {
				headers: new HttpHeaders({ loginUser: this.login })
			})
			.subscribe(
				responseData => {
					console.log(responseData);
					this.getAllUsers();
				},
				(error: HttpErrorResponse) => {
					console.log(error);
					if (error.status === 401) {
						this.errorSubject.next('UNAUTHORIZED');
					} else {
						this.errorSubject.next(error.statusText);
					}
				}
			);
	}

	updateUser(newUser: UserRecord) {
		this.httpClient
			.put(this.apiUrl + '/users/' + newUser.id, newUser, {
				headers: new HttpHeaders({ loginUser: this.login })
			})
			.subscribe(
				responseData => {
					console.log(responseData);
					this.getAllUsers();
				},
				(error: HttpErrorResponse) => {
					console.log(error);
					if (error.status === 401) {
						this.errorSubject.next('UNAUTHORIZED');
					} else {
						this.errorSubject.next(error.statusText);
					}
				}
			);
	}

	deleteUser(userId: number) {
		this.httpClient
			.delete(this.apiUrl + '/users/' + userId, {
				headers: new HttpHeaders({ loginUser: this.login })
			})
			.subscribe(
				responseData => {
					console.log(responseData);
					this.getAllUsers();
				},
				(error: HttpErrorResponse) => {
					console.log(error);
					if (error.status === 401) {
						this.errorSubject.next('UNAUTHORIZED');
					} else {
						this.errorSubject.next(error.statusText);
					}
				}
			);
	}
}

/**
 * The errors can happen if service is not available on localhost:8080
 * Headers can be attached as shown in the getAll request
 * Similarly params can be attached as another member as headers
 * Observe: 'response' returns headers along with body, 'body' only returns body
 * Observe: 'events' returns HttpEventType types like sent/response/download progress etc
 * This can be accessed by using rxjs operator 'tap' and piping it before subscribe
 * Can configure responseType as 'text' for string or 'blob' for files, default is 'json'
 *
 * Login value should be sent in header to backend for all except getAllUsers to validate
 * Block them if login value is 'N' and allow if not in back-end
 * Return unauthorized if accessing other APIs without login
 * Register user updates authUsers in back-end and checks for duplicate usernames
 */
