import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';

@Component({
	selector: 'app-new-account',
	templateUrl: './new-account.component.html',
	styleUrls: ['./new-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewAccountComponent implements OnInit {
	name: string;
	status: string;

	constructor(private accountService: AccountsService) {}

	ngOnInit(): void {}

	onCreateAccount() {
		const newAccount = { name: this.name, status: this.status };
		this.accountService.createAccount(newAccount);
		this.name = null;
		this.status = null;
	}
}
