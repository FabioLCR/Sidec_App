import { TestBed, inject } from '@angular/core/testing';

import { InboxServerResultsService } from './inbox-server-results.service';

describe('InboxServerResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InboxServerResultsService]
    });
  });

  it('should be created', inject([InboxServerResultsService], (service: InboxServerResultsService) => {
    expect(service).toBeTruthy();
  }));
});
