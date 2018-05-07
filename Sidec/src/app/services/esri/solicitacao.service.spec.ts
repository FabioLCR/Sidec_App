import { TestBed, inject } from '@angular/core/testing';

import { SolicitacaoService } from './solicitacao.service';

describe('SolicitacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolicitacaoService]
    });
  });

  it('should be created', inject([SolicitacaoService], (service: SolicitacaoService) => {
    expect(service).toBeTruthy();
  }));
});
