import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { LoggingService } from '../services/logging.service';

@Component({
	selector: 'app-account-list',
	templateUrl: './account-list.component.html',
	styleUrls: ['./account-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AccountsService, LoggingService]
})
export class AccountListComponent implements OnInit {
	accountList: { name: string; status: string }[] = [];

	constructor(private accountService: AccountsService) {}

	ngOnInit(): void {
		this.accountList = this.accountService.getAccountList();
	}
}
