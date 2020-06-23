import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-http-pipe',
	templateUrl: './http-pipe.component.html',
	styleUrls: ['./http-pipe.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpPipeComponent implements OnInit {
	// pipes members
	moduleStatus = new Promise(resolve => {
		setTimeout(() => {
			resolve('Loaded');
		}, 4000);
	});
	filterString: string;
	filterProp: string;
	servers: { capacity: string; name: string; status: string; cores: number }[] = [
		{ capacity: 'medium', name: 'UAT Server', status: 'stable', cores: 16 },
		{ capacity: 'large', name: 'Production Server', status: 'stable', cores: 32 },
		{ capacity: 'large', name: 'SAT Server', status: 'stable', cores: 32 },
		{ capacity: 'small', name: 'Development Server', status: 'unstable', cores: 8 }
	];

	// http members
	apiUrl = 'http://localhost:8080';
	requestType = 'GET';
	userId: number;
	userName: string;
	userAge: number;
	users: { id: number; firstName: string; lastName: string; age: number }[] = [];

	constructor(private cdr: ChangeDetectorRef, private httpClient: HttpClient) {}

	ngOnInit() {
		this.getAllUsers();
	}

	getColorFromCores(server: { capacity: string; name: string; status: string; cores: number }) {
		if (server.status === 'unstable') {
			return 'lightcoral';
		}
		if (server.cores <= 8) {
			return 'lightcoral';
		}
		if (server.cores <= 16) {
			return 'yellow';
		}
		return 'lightgreen';
	}

	onAddServer() {
		this.servers.push({ capacity: 'small', name: 'Test Server', status: 'unstable', cores: 8 });
		// force change to recalculate filter or use pure: false on pipe
		if (this.filterString) {
			const dummy = this.filterString;
			this.filterString += ' ';
			setTimeout(() => {
				this.filterString = dummy;
				this.cdr.detectChanges();
			}, 100);
		}
	}

	userFormFunctions() {
		switch (this.requestType) {
			case 'GET':
				const selectedUser = this.getExistingUser(this.userId);
				if (selectedUser) {
					console.log('selected user is ', selectedUser);
				}
				break;
			case 'POST':
				this.createNewUser({
					id: this.userId,
					firstName: this.userName.split(' ')[0],
					lastName: this.userName.split(' ')[1],
					age: this.userAge
				});
				break;
			case 'PUT':
				this.updateExistingUser({
					id: this.userId,
					firstName: this.userName.split(' ')[0],
					lastName: this.userName.split(' ')[1],
					age: this.userAge
				});
				break;
			case 'DELETE':
				this.deleteExistingUser(this.userId);
				break;
		}
	}

	getAllUsers() {
		console.log('get all');
		this.httpClient.get(this.apiUrl + '/users').subscribe(responseData => {
			console.log(responseData);
			if (responseData) {
				this.users = responseData as { id: number; firstName: string; lastName: string; age: number }[];
				this.cdr.detectChanges();
			}
		});
	}

	getExistingUser(userId: number) {
		let selectedUser: { id: number; firstName: string; lastName: string; age: number };
		this.httpClient.get(this.apiUrl + '/users/' + userId).subscribe(responseData => {
			console.log(responseData);
			if (responseData) {
				selectedUser = responseData as { id: number; firstName: string; lastName: string; age: number };
			}
		});
		return selectedUser;
	}

	createNewUser(newUser: { id: number; firstName: string; lastName: string; age: number }) {
		this.httpClient.post(this.apiUrl + '/users', newUser).subscribe(responseData => {
			console.log(responseData);
			this.getAllUsers();
		});
	}

	updateExistingUser(newUser: { id: number; firstName: string; lastName: string; age: number }) {
		this.httpClient.put(this.apiUrl + '/users/' + newUser.id, newUser).subscribe(responseData => {
			console.log(responseData);
			this.getAllUsers();
		});
	}

	deleteExistingUser(userId: number) {
		this.httpClient.delete(this.apiUrl + '/users/' + userId).subscribe(responseData => {
			console.log(responseData);
			this.getAllUsers();
		});
	}
}

/**
 * Handle error cases when id doesn't exist or something
 */
