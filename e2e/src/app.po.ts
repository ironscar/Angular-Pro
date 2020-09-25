import { browser, by, element } from 'protractor';

export class AppPage {
	navigateTo() {
		return browser.get(browser.baseUrl) as Promise<any>;
	}

	getTitleText() {
		return element(by.css('app-root .app-title')).getText() as Promise<string>;
	}

	secondStoreButtonNavigation() {
		return element(by.css('app-root a.module-link[routerlink="/second-store"]')).click() as Promise<any>;
	}

	getSecondStoreModuleTitleText() {
		return element(by.css('app-root app-second-store mat-card mat-card-title')).getText() as Promise<string>;
	}
}

/**
 * careful of how to access elements as browser down-cases attribute names
 * when you write routerLink in the app, browser still turns it into routerlink so you have to check accordingly
 */
