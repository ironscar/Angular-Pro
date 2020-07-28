import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondStoreAppComponent } from './second-store-app.component';

describe('SecondStoreAppComponent', () => {
  let component: SecondStoreAppComponent;
  let fixture: ComponentFixture<SecondStoreAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondStoreAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondStoreAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
