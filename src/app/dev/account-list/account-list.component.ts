import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { LoggingService } from '../services/logging.service';
import { Subscription, Observable, Subscriber, Subject, pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
	selector: 'app-account-list',
	templateUrl: './account-list.component.html',
	styleUrls: ['./account-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AccountsService, LoggingService]
})
export class AccountListComponent implements OnInit, OnDestroy {
	private intervalSubscription: Subscription;
	private subjectSubscription: Subscription;
	private subjectCount: number;

	accountList: { name: string; status: string }[] = [];
	customSubject = new Subject<number>();

	constructor(private accountService: AccountsService) {}

	ngOnInit(): void {
		this.accountList = this.accountService.getAccountList();

		this.createAndSubscribeToCustomObservable();

		this.subscribeToSubject();
	}

	passNewValueFromSubject() {
		if (!this.subjectCount) {
			console.log('subject started');
			this.subjectCount = 0;
		}
		if (this.subjectCount < 0) {
			this.customSubject.error(new Error('negative numbers not allowed'));
		} else if (this.subjectCount > 5) {
			this.customSubject.complete();
		} else {
			this.customSubject.next(this.subjectCount++);
		}
	}

	private discardAlternateAndIncrement() {
		// you can make your own operators usig pipe function like this
		return pipe(
			filter((data: number) => {
				return data % 2 === 0;
			}),
			map((data: number) => {
				return 'Round ' + (data + 1);
			})
		);
	}

	subscribeToSubject() {
		this.subjectSubscription = this.customSubject.pipe(this.discardAlternateAndIncrement()).subscribe(
			data => {
				console.log(data);
			},
			error => {
				console.log(error.message);
			},
			() => {
				console.log('subject completed');
			}
		);
	}

	createAndSubscribeToCustomObservable() {
		console.log('observable started');
		let count = 0;
		// creating observable
		const customObservable = new Observable((subscriber: Subscriber<any>) => {
			setInterval(() => {
				subscriber.next(count);
				if (count >= 4) {
					subscriber.complete();
				}
				if (count < 0) {
					subscriber.error(new Error('negative numbers not allowed'));
				}
				count++;
			}, 500);
		});

		// observable operators & subscribing to it
		this.intervalSubscription = customObservable
			.pipe(
				filter((data: number) => {
					return data % 2 === 0;
				}),
				map((data: number) => {
					return 'Round ' + (data + 1);
				})
			)
			.subscribe(
				data => {
					console.log(data);
				},
				error => {
					console.log(error.message);
				},
				() => {
					console.log('observable completed');
				}
			);
	}

	ngOnDestroy() {
		this.intervalSubscription.unsubscribe();
		this.subjectSubscription.unsubscribe();
	}
}

/**
 * update all service event emitters to subjects
 */
