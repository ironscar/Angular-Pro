import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/dev/services/can-deactivate-guard.service';

@Component({
	selector: 'app-home-child',
	templateUrl: './home-child.component.html',
	styleUrls: ['./home-child.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeChildComponent implements OnInit, CanComponentDeactivate {
	message = 'none';
	name = 'child';
	changesSaved = false;

	constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		// from query params
		this.route.params.subscribe(data => {
			this.message = data['id'];
			this.cdr.detectChanges();
		});
		// from route resolver
		this.route.data.subscribe(data => {
			this.name = data['child'];
			this.cdr.detectChanges();
		});
	}

	saveChanges() {
		this.changesSaved = true;
		setTimeout(() => {
			this.router.navigate(['/home']);
		}, 800);
	}

	canDeactivate() {
		if (!this.changesSaved) {
			return confirm('Do you want to discard the changes');
		}
		return true;
	}
}
