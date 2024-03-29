import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
	providers: [UserService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
	user: { name: string };
	isLoggedIn = false;
	data: any;

	constructor(private userService: UserService) {}

	ngOnInit() {
		this.user = this.userService.user;
		this.userService.getDetails().then(data => {
			this.data = data;
		});
	}
}
