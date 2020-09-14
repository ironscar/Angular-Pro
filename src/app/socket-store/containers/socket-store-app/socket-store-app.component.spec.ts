import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketStoreAppComponent } from './socket-store-app.component';

describe('SocketStoreAppComponent', () => {
  let component: SocketStoreAppComponent;
  let fixture: ComponentFixture<SocketStoreAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketStoreAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketStoreAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
