import { TestBed } from '@angular/core/testing';

import { EnrollServiceService } from './enroll-service.service';

describe('EnrollServiceService', () => {
  let service: EnrollServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
