import { async, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

// isolated (without Angular)
describe('UserComponent reverse string test', () => {
	it('should reverse the string', () => {
		const us = new UserService();
		expect(us.reverseString('Data')).toEqual('ataD');
	});
});

// Non-isolated (with Angular)
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

	it('data prop should resolve to "Data" asynchronously', async(() => {
		const fixture = TestBed.createComponent(UserComponent);
		const component = fixture.debugElement.componentInstance;
		const service = fixture.debugElement.injector.get(UserService);
		spyOn(service, 'getDetails').and.returnValue(Promise.resolve('Data'));
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			expect(component.data).toBe('Data');
		});
	}));
});

/**
 * fixture detect changes is required to manually fire change detection after each change to component
 * the property change requires a new component to be created so generally try to create this each time
 * don't define fixture, component etc outside to avoid that problem
 * console logs can be defined here in case required
 * Generally, async tasks are service code and you wouldn't make those calls in test
 * As a result, you will mock them using spyOn which can spy on a certain method and return mock values
 * It returns this value when the method is called
 * Async creates an async test env by faking the async tasks
 * whenStable specifies what to do when async task ends as a callback
 * Isolated tests are those which are completely independent and need no Angular test modules
 * These can be done for features like direct data transformations etc and nothing Angular related
 */
