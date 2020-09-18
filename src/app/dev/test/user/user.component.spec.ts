import { async, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserComponent]
		}).compileComponents();
	}));

	it('should create', () => {
		const fixture = TestBed.createComponent(UserComponent);
		const component = fixture.debugElement.componentInstance;
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it('should use username from service', () => {
		const fixture = TestBed.createComponent(UserComponent);
		const component = fixture.debugElement.componentInstance;
		const service = fixture.debugElement.injector.get(UserService);
		fixture.detectChanges();
		expect(component.user.name).toEqual(service.user.name);
	});

	it('should show username if logged in', () => {
		const fixture = TestBed.createComponent(UserComponent);
		const component = fixture.debugElement.componentInstance;
		component.isLoggedIn = true;
		fixture.detectChanges();
		const newCompiled = fixture.debugElement.nativeElement;
		console.log((newCompiled.querySelector('p') as HTMLElement).textContent);
		expect((newCompiled.querySelector('p') as HTMLElement).textContent).toContain(' User is: Max ');
	});

	it('should not show username if not logged in', () => {
		const fixture = TestBed.createComponent(UserComponent);
		const compiled = fixture.debugElement.nativeElement;
		fixture.detectChanges();
		expect((compiled.querySelector('p') as HTMLElement).textContent).toContain(' Please log in ');
	});
});

/**
 * fixture detect changes is required to manually fire change detection after each change to component
 * the property change requires a new component to be created so generally try to create this each time
 * don't define fixture, component etc outside to avoid that problem
 * console logs can be defined here in case required
 */
