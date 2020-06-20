import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
	transform(value: any, separator?: string) {
		const words = value.split(' ');
		let shortName = '';
		for (const word of words) {
			shortName += (word as string).charAt(0).toUpperCase() + separator;
		}
		return shortName;
	}
}
