import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
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
 * Headers can be attached as shown in the getAll request
 * Similarly params can be attached as another member as headers
 * Observe: 'response' returns headers along with body, 'body' only returns body
 * Observe: 'events' returns HttpEventType types like sent/response/download progress etc
 * This can be accessed by using rxjs operator 'tap' and piping it before subscribe
 * Can configure responseType as 'text' for string or 'blob' for files, default is 'json'
 */
