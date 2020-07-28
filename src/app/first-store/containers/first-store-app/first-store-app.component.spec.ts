import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstStoreAppComponent } from './first-store-app.component';

describe('FirstStoreAppComponent', () => {
  let component: FirstStoreAppComponent;
  let fixture: ComponentFixture<FirstStoreAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstStoreAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstStoreAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
