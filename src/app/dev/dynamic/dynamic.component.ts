import { Component, OnInit, ChangeDetectionStrategy, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { DynamicAlertComponent } from './dynamic-alert/dynamic-alert.component';
import { PlaceholderDirective } from '../directives/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-dynamic',
	templateUrl: './dynamic.component.html',
	styleUrls: ['./dynamic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicComponent implements OnInit, OnDestroy {
	showAlert = false;
	alertMessage = 'Happy dog says hello';
	alertMessage2 = 'Happy cat says hello';

	dynamicAlertSubscription: Subscription;
	@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

	ngOnInit() {}

	toggleAlert() {
		this.showAlert = !this.showAlert;
	}

	onEmitClose() {
		this.showAlert = false;
	}

	generateProgrammaticAlert() {
		const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicAlertComponent);
		const hostRef = this.alertHost.viewContainerRef;

		// removes all components created in that element placeholder
		hostRef.clear();

		const alertRef = hostRef.createComponent(alertComponentFactory);
		alertRef.instance.message = this.alertMessage2;
		this.dynamicAlertSubscription = alertRef.instance.emitClose.subscribe(() => {
			alertRef.destroy();
			hostRef.clear();
		});

		// environment variables usage
		console.log(environment.logAlertMessage);
	}

	ngOnDestroy() {
		if (this.dynamicAlertSubscription) {
			this.dynamicAlertSubscription.unsubscribe();
		}
	}
}

/**
 * The dynamic component factory would earlier require you to specify the component
 * in app module in the entryComponents array but this is not required as of Angular 9
 */
