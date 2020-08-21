import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularAnimsComponent } from './angular-anims.component';

describe('AngularAnimsComponent', () => {
  let component: AngularAnimsComponent;
  let fixture: ComponentFixture<AngularAnimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularAnimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularAnimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
