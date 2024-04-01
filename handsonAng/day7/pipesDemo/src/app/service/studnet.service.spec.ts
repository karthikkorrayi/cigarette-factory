import { TestBed } from '@angular/core/testing';

import { StudnetService } from './studnet.service';

describe('StudnetService', () => {
  let service: StudnetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudnetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
