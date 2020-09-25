import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryServiceComponent } from './library-service.component';

describe('LibraryServiceComponent', () => {
  let component: LibraryServiceComponent;
  let fixture: ComponentFixture<LibraryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
