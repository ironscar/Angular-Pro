import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpPipeComponent } from './http-pipe.component';

describe('HttpPipeComponent', () => {
  let component: HttpPipeComponent;
  let fixture: ComponentFixture<HttpPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpPipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
