import { TestBed } from '@angular/core/testing';

import { AddressApiService } from './service/addressApi.service';

describe('AddressApiServiceService', () => {
  let service: AddressApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
