import { TestBed } from '@angular/core/testing';

import { LookupApiService } from './service/lookupApi.service';

describe('LookupService', () => {
  let service: LookupApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookupApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
