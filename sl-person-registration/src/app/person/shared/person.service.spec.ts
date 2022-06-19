import { TestBed } from '@angular/core/testing';

import { PersonApiService } from './service/personApi.service';

describe('PersonService', () => {
  let service: PersonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
