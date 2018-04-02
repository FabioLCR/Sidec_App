import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxFiltroComponent } from './inbox-filtro.component';

describe('InboxFiltroComponent', () => {
  let component: InboxFiltroComponent;
  let fixture: ComponentFixture<InboxFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
