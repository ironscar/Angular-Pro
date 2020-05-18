import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable()
export class AccountsService {
	private accountList: { name: string; status: string }[] = [
		{ name: 'Account 1', status: 'Active' },
		{ name: 'Account 2', status: 'Inactive' },
		{ name: 'Account 3', status: 'Unknown' }
	];
	private counts = { toActive: 0, toInactive: 0, toUnknown: 0 };

	constructor(private loggingService: LoggingService) {}

	createAccount(account: { name: string; status: string }) {
		this.accountList.push(account);
		this.loggingService.logAccountListChange(account, true);
		this.counts['to' + account.status]++;
		this.getStatusTransitionCounts();
	}

	updateAccount(account: { name: string; status: string }, newStatus: string) {
		account.status = newStatus;
		this.loggingService.logAccountListChange(account);
		this.counts['to' + newStatus]++;
		this.getStatusTransitionCounts();
	}

	getStatusTransitionCounts() {
		console.log(this.counts);
	}

	resetStatusTransitionCounts() {
		this.counts.toActive = 0;
		this.counts.toInactive = 0;
		this.counts.toUnknown = 0;
	}

	getAccountList() {
		return this.accountList;
	}
}

/* when provided in a component, same instance of service is available across all of its
 * children
 * If service provided in children again, the instance of service in child overrides
 * instance of service in parent
 * Needs @Injectable so that logging service can be injected into it and logging service
 * should be provided either in the component where accounts service is provided or its parents
 */
