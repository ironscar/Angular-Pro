import { Component } from '@angular/core';

@Component({
	selector: 'app-profile',
	// selector: '[app-profile]',
	// selector: '.app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
	profileName = 'Profile A';
}

/** Use selector as:
 * - element
 * - attribute
 * - class
 */
