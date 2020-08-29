self.addEventListener('install', function (event) {
	console.log('inside service worker ', event);
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
