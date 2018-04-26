import { TestBed, inject } from '@angular/core/testing';

import { SidecDomainsService } from './sidec-domains.service';

describe('SidecDomainsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidecDomainsService]
    });
  });

  it('should be created', inject([SidecDomainsService], (service: SidecDomainsService) => {
    expect(service).toBeTruthy();
  }));
});
