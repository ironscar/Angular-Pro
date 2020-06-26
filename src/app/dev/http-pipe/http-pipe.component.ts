import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserRecord } from './user.interface';
import { BackendApiService } from '../services/backend-api.service';

@Component({
	selector: 'app-http-pipe',
	templateUrl: './http-pipe.component.html',
	styleUrls: ['./http-pipe.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [BackendApiService]
})
export class HttpPipeComponent implements OnInit, OnDestroy {
	// pipes members
	pipeStatus = new Promise(resolve => {
		setTimeout(() => resolve('loaded'), 3000);
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
	moduleStatus = false;
	apiUrl = 'http://localhost:8080';
	requestType = 'GET';
	userId: number;
	userName: string;
	userAge: number;
	users: UserRecord[] = [];
	responseSubscription: Subscription;
	httpErrorSubscription: Subscription;
	errorMessage: string = null;

	constructor(private cdr: ChangeDetectorRef, private apiService: BackendApiService) {}

	ngOnInit() {
		this.apiService.getAllUsers();
		this.responseSubscription = this.apiService.responseSubject.subscribe((response: { type: string; users: UserRecord[] }) => {
			if (response.type === 'all') {
				console.log('get all users');
				this.users = response.users;
				this.moduleStatus = true;
				this.cdr.detectChanges();
			}
			if (response.type === 'one') {
				console.log('selected user is ', response.users[0]);
			}
		});
		this.httpErrorSubscription = this.apiService.errorSubject.subscribe(data => {
			this.moduleStatus = true;
			this.errorMessage = data;
			this.cdr.detectChanges();
		});
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
		this.errorMessage = null;
		this.moduleStatus = this.requestType === 'GET';
		switch (this.requestType) {
			case 'GET':
				this.apiService.getExistingUser(this.userId);
				break;
			case 'POST':
				this.apiService.createNewUser({
					id: this.userId,
					firstName: this.userName.split(' ')[0],
					lastName: this.userName.split(' ')[1],
					age: this.userAge
				});
				break;
			case 'PUT':
				this.apiService.updateUser({
					id: this.userId,
					firstName: this.userName.split(' ')[0],
					lastName: this.userName.split(' ')[1],
					age: this.userAge
				});
				break;
			case 'DELETE':
				this.apiService.deleteUser(this.userId);
				break;
		}
	}

	ngOnDestroy() {
		this.responseSubscription.unsubscribe();
		this.httpErrorSubscription.unsubscribe();
	}
}
