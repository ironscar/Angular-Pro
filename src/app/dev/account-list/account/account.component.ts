import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
	@Input() account: { name: string; status: string };

	constructor(private accountService: AccountsService) {}

	ngOnInit(): void {}

	updateAccountStatus(newStatus: string) {
		this.accountService.updateAccount(this.account, newStatus);
	}
}
