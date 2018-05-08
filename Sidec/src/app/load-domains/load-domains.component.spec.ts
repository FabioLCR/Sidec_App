import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDomainsComponent } from './load-domains.component';

describe('LoadDomainsComponent', () => {
  let component: LoadDomainsComponent;
  let fixture: ComponentFixture<LoadDomainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadDomainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
