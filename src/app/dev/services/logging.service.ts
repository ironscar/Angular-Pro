export class LoggingService {
	logAccountListChange(account: { name: string; status: string }, isCreated: boolean = false) {
		console.log(account.name + (isCreated ? ' created with' : ' set to') + ' status ' + account.status);
	}
}
