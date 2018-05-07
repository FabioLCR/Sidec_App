import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxDescricaoSolicitacaoComponent } from './inbox-descricao-solicitacao.component';

describe('InboxDescricaoSolicitacaoComponent', () => {
  let component: InboxDescricaoSolicitacaoComponent;
  let fixture: ComponentFixture<InboxDescricaoSolicitacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxDescricaoSolicitacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxDescricaoSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
