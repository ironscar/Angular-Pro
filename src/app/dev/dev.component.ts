import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-dev',
	templateUrl: './dev.component.html',
	styleUrls: ['./dev.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevComponent implements OnInit, OnDestroy {
	flipDisable = false;
	profileName = 'Profile A';
	profileFlag = false;
	serverNames = ['Server 1', 'Server 2', 'Server 3'];
	tabIndex = 0;
	value = 10;
	routeSubscription: Subscription;

	dynamicNormalContent = null;
	dynamicComponentContent = null;
	dynamicElementContent = null;

	constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private domSanitizer: DomSanitizer) {
		setTimeout(() => {
			this.flipDisable = true;
			this.cdr.detectChanges();
		}, 2000);

		// async task which loads custom angular element
		setTimeout(() => {
			this.dynamicNormalContent = this.domSanitizer.bypassSecurityTrustHtml('<p> Rendered dynamically </p>');
			this.dynamicComponentContent = this.domSanitizer.bypassSecurityTrustHtml(
				'<app-elements message2="Rendered dynamically!"></app-elements>'
			);
			this.dynamicElementContent = this.domSanitizer.bypassSecurityTrustHtml(
				'<angular-element2 message2="Rendered dynamically!"></angular-element2>'
			);
		}, 1000);
	}

	ngOnInit() {
		// first time set
		this.tabIndex = this.route.snapshot.params['id'];
		// reactive set in case you are already on the component
		this.routeSubscription = this.route.params.subscribe((params: Params) => {
			this.tabIndex = params['id'];
		});
		// get query params (can be firs time or reactive subscription as before)
		const queryParamTab = this.route.snapshot.queryParams['tab'];
		if (queryParamTab) {
			this.tabIndex = queryParamTab;
		}
		// get hash params (can be firs time or reactive subscription as before)
		const hashTab = this.route.snapshot.fragment;
		if (hashTab) {
			this.tabIndex = Number(hashTab.split('=')[1]);
		}
	}

	addServer() {
		this.serverNames.push('Server ' + (this.serverNames.length + 1));
	}

	getColor(index: number) {
		return this.isValidServerName(index) ? 'green' : 'red';
	}

	isValidServerName(index: number) {
		return this.serverNames[index].indexOf('Server') !== -1;
	}

	onUpdateServerName(ev: Event, index: number = 0) {
		if (index === 0) {
			this.serverNames[0] = (ev.target as HTMLInputElement).value;
		} else if (index === 1) {
			this.serverNames[1] = 'Server 2';
		}
	}

	onUpdateProfileFlag() {
		this.profileFlag = !this.profileFlag;
	}

	updateProfileName(name: string) {
		this.profileName = name;
	}

	ngOnDestroy() {
		// though angular does this by itself for routes, this is how to end a subscription
		this.routeSubscription.unsubscribe();
	}
}

/**
 * Angular components by default are compiled before being loaded on screen
 * So if dynamic content includes html wth component name, it won't resolve in DOM
 * We can use angular elements for this to still resolve these components
 * Angular elements convert components to native web components for use in vanilla HTML5
 * Include custom elements polyfill in package json for angular elements
 * Polyfills added for angular elements
 * innerHTML setting of html is unsafe and may allow security attacks
 * We use DOMSanitizer to trust out content as we know it is safe for this POC example
 */
