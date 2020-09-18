// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-firefox-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('@angular-devkit/build-angular/plugins/karma')
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageIstanbulReporter: {
			dir: require('path').join(__dirname, './coverage/angular-pro'),
			reports: ['html', 'lcovonly', 'text-summary'],
			fixWebpackSourcePaths: true
		},
		reporters: ['progress', 'kjhtml'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: [
			'HeadlessChrome'
			// 'Firefox',
			// 'Chrome'
		],
		customLaunchers: {
			HeadlessChrome: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox']
			}
		},
		singleRun: true,
		restartOnFileChange: false
	});
};

/**
 * Chrome seems to have some problem running out of the box so we run it with no-sandbox flag
 * While headless chrome is fine with that flag, non-headless is not and says security/stability may suffer
 * Firefox doesn't seem to run automatically at all for unknown reasons
 * Firefox and Chrome only work if 'localhost:9876' is manually loaded up in each browser just before the tests run
 * Use headless chrome in no sandbox mode by default
 */
