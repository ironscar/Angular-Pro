import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-home-child',
	templateUrl: './home-child.component.html',
	styleUrls: ['./home-child.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeChildComponent implements OnInit {
	message = 'none';

	constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.route.params.subscribe(data => {
			this.message = data['id'];
			this.cdr.detectChanges();
		});
	}
}
