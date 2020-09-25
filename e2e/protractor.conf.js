// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
	allScriptsTimeout: 11000,
	specs: ['./src/**/*.e2e-spec.ts'],
	multiCapabilities: [
		{
			browserName: 'chrome',
			chromeOptions: {
				args: ['--no-sandbox']
			}
		}
		// {
		// 	browserName: 'firefox',
		// 	'moz:firefoxOptions': {
		// 		args: ['--safe-mode']
		// 	}
		// }
	],
	directConnect: true,
	baseUrl: 'http://localhost:4200/',
	// seleniumAddress: 'http://localhost:4444/wd/hub',
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function () {}
	},
	onPrepare() {
		require('ts-node').register({
			project: require('path').join(__dirname, './tsconfig.json')
		});
		jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
	}
};

/**
 * Install webdriver-manager and run webdriver-manager update script outside proxy
 * Run ng e2e after closing dev server as both run on 4200 by default
 * selenium is used under the hood
 * multiCapabilities is used to specify multiple browsers
 * use chrome no-sandbox for it to work properly
 * chrome runs just with 'ng e2e' but firefox doesn't
 * have to set directConnect as false for all browsers except chrome
 * have to include seleniuum address if directConnect is false
 * firefox has connection issues currently so leaving it commented
 */
