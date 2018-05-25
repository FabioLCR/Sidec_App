import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobradeSelecaoComponent } from './cobrade-selecao.component';

describe('CobradeSelecaoComponent', () => {
  let component: CobradeSelecaoComponent;
  let fixture: ComponentFixture<CobradeSelecaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobradeSelecaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobradeSelecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
