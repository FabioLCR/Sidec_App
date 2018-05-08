import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidecMainAppComponent } from './sidec-main-app.component';

describe('SidecMainAppComponent', () => {
  let component: SidecMainAppComponent;
  let fixture: ComponentFixture<SidecMainAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidecMainAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidecMainAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
