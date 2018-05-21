import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPageBarComponent } from './load-page-bar.component';

describe('LoadPageBarComponent', () => {
  let component: LoadPageBarComponent;
  let fixture: ComponentFixture<LoadPageBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadPageBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
