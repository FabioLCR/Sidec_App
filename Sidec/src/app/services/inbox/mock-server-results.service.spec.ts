import { TestBed, inject } from '@angular/core/testing';

import { MockServerResultsService } from './mock-server-results.service';

describe('MockServerResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockServerResultsService]
    });
  });

  it('should be created', inject([MockServerResultsService], (service: MockServerResultsService) => {
    expect(service).toBeTruthy();
  }));
});
