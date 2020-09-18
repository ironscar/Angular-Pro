import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';
import { UserComponent } from './user/user.component';

describe('TestComponent', () => {
	let component: TestComponent;
	let compiled: any;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent, UserComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have title "Angular Unit Testing"', () => {
		expect(component.title).toEqual('Angular Unit Testing');
	});

	it('should have h2 with text "Angular Unit Testing"', () => {
		compiled = fixture.debugElement.nativeElement;
		expect((compiled.querySelector('h2') as HTMLElement).textContent).toContain('Angular Unit Testing');
	});
});

/**
 * beforeEach is used to run something before each test case
 * each test case is defined by it
 * TestBed is the main testing utility that allows to configure the test module
 * each test case must create the component again if not done in a beforeEach as its independent
 */
