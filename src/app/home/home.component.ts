import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthLoginService } from '../dev/services/auth-login.servce';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
	constructor(private router: Router, private route: ActivatedRoute, private authLoginService: AuthLoginService) {}

	ngOnInit() {}

	loadChildRoutes(id: number) {
		this.router.navigate(['/home', 'child', id]);
	}

	onLogin() {
		this.authLoginService.login();
	}

	onLogout() {
		this.authLoginService.logout();
		this.router.navigate(['/home']);
	}

	onLoadDeveloperEnvironment(paramType: string = 'route') {
		if (paramType === 'route') {
			this.router.navigate(['/dev/1'], { relativeTo: this.route });
		} else if (paramType === 'query') {
			this.router.navigate(['/dev'], { relativeTo: this.route, queryParams: { tab: 1 } });
		} else if (paramType === 'hash') {
			this.router.navigate(['/dev'], { relativeTo: this.route, fragment: 'tab=1' });
		}
	}

	onLoadMainEnvironment(paramType: string = 'route') {
		if (paramType === 'route') {
			this.router.navigate(['/main/1'], { relativeTo: this.route });
		} else if (paramType === 'query') {
			this.router.navigate(['/main'], { relativeTo: this.route, queryParams: { tab: 1 } });
		} else if (paramType === 'hash') {
			this.router.navigate(['/main'], { relativeTo: this.route, fragment: 'tab=1' });
		}
	}
}

/**
 * relative paths require relativeTo in navigate
 * absolute paths always used with slash
 * fragment is type string while query param is an object
 */
