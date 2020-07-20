import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthLoginService } from './auth-login.servce';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
	constructor(private authLoginService: AuthLoginService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.authLoginService.isAuthenticated().then((authenticated: boolean) => {
			if (authenticated) {
				return true;
			} else {
				this.router.navigate(['/']);
			}
		});
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.canActivate(route, state);
	}
}

/**
 * Can return UrlTree or Observable<boolean | UrlTree> to automatically redirect
 * Better not to redirect manually here as it may create race conditions
 * Its done as this.router.createUrlTree(['/auth']);
 */
