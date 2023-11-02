import { TestBed } from '@angular/core/testing';

import { CatergoryService } from './catergory.service';

describe('CatergoryService', () => {
  let service: CatergoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatergoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
