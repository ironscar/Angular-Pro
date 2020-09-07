var STATIC_CACHE_NAME = 'my_static_cache_v1';
var DYNAMIC_CACHE_NAME = 'my_dynamic_cache_v1';
var myCaches = [STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME];
var urlsToCache = [
	'./index.html',
	'./offline.html',
	'./favicon.ico',
	'./runtime.js',
	'./polyfills.js',
	'./styles.js',
	'vendor.js',
	'main.js',
	'dev-dev-module.js'
];

self.addEventListener('install', function (event) {
	console.log('inside service worker install ', event);
	event.waitUntil(
		Promise.all(
			myCaches.map(function (cacheName) {
				if (cacheName === STATIC_CACHE_NAME) {
					// open static cache and save urls to it
					caches
						.open(STATIC_CACHE_NAME)
						.then(function (cache) {
							console.log('Opened static cache', cache);
							return cache.addAll(urlsToCache);
						})
						.catch(function (error) {
							console.log('service worker caching error', error);
						});
				} else if (cacheName === DYNAMIC_CACHE_NAME) {
					// create dynamic cache
					caches
						.open(DYNAMIC_CACHE_NAME)
						.then(function (cache) {
							console.log('Opened dynamic cache', cache);
						})
						.catch(function (error) {
							console.log('service worker caching error', error);
						});
				}
			})
		)
	);
});

self.addEventListener('activate', function (event) {
	console.log('inside service worker activate ', event);
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function (cacheName) {
						return !myCaches.includes(cacheName);
					})
					.map(function (cacheName) {
						return caches.delete(cacheName);
					})
			);
		})
	);
});

self.addEventListener('fetch', function (event) {
	console.log('service worker intercept requests', event);
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return fetch(event.request)
				.then(function (actualResponse) {
					if (actualResponse) {
						console.log('returned actual response from network');
						// cache all stuff again just in case updated
						caches
							.open(STATIC_CACHE_NAME)
							.then(function (cache) {
								console.log('Opened static cache', cache);
								return cache.addAll(urlsToCache);
							})
							.catch(function (error) {
								console.log('service worker caching error', error);
							});
						// return actual response
						return actualResponse;
					}
				})
				.catch(function () {
					if (response) {
						console.log('service worker cache match found for ', event.request.url);
						console.log(response);
						return response;
					} else if (event.request.url.indexOf('/dev') != -1) {
						console.log('service worker dev module used index.html');
						return caches.open(STATIC_CACHE_NAME).then(function (cache) {
							return cache.match('index.html').then(function (response) {
								if (response) {
									console.log('response for index.html used');
									return response;
								}
								console.log('index html not found');
							});
						});
					} else {
						console.log('service worker dev module used offline.html');
						return caches.open(STATIC_CACHE_NAME).then(function (cache) {
							return cache.match('offline.html').then(function (response) {
								if (response) {
									console.log('response for offline.html found');
									return response;
								}
								console.log('offline html not found');
							});
						});
					}
				});
		})
	);
});

self.addEventListener('message', function (event) {
	const data = event.data;
	switch (data.type) {
		case 'TWO_WAY_COMMUNICATION': {
			console.log('responding to message from page: ', data.payload);
			event.ports[0].postMessage({
				type: 'TWO_WAY_COMMUNICATION',
				payload: 'Hi, dev module!'
			});
			break;
		}
		default:
			console.log('no such service worker action defined');
	}
});

/**
 * install steps uses a waitUntil for installation to complete and then cache assets by promise
 * activate step can be used to refresh cache or remove old version of cache
 * keep activate light as page wont load until activate completes
 * when service worker is updated with new cache version, it will delete old cache
 * thing is cache won't update until you update service worker so change the version as there is nothing else to change
 * fetch is used to intercept all requests and responses with a few restrictions like cors
 * for resources with dev in url, we fetch index.html and otherwise we fetch offline.html
 * currently there is set to pattern of network call & update cache, else cache call, else offline html
 * currently the cache update on successful network call is unoptimized as all items are refreshed on each fetch whereas it should only happen once for each reload
 * ideally you would take a look at the request & store that but since routes aren't cached here, that won't make sense
 * Its important to maintain the local storage space as browser can clear it out if its nearing full
 */
