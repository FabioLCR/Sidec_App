import { TestBed, inject } from '@angular/core/testing';

import { SidecDomains } from './sidec-domains.service';

describe('SidecDomainsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidecDomains]
    });
  });

  it('should be created', inject([SidecDomains], (service: SidecDomains) => {
    expect(service).toBeTruthy();
  }));
});
