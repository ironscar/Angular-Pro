export class UserService {
	user: { name: string } = { name: 'Max' };

	getDetails() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('Data');
			}, 1500);
		});
	}

	reverseString(value: string) {
		return value.split('').reverse().join('');
	}
}
