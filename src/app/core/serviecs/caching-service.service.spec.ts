import { TestBed } from '@angular/core/testing';

import { CachingServiceService } from './caching-service.service';

describe('CachingServiceService', () => {
  let service: CachingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
