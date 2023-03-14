import { TestBed } from '@angular/core/testing';

import { FormSuccessGuardService } from './form-success-guard.service';

describe('FormSuccessGuardService', () => {
  let service: FormSuccessGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSuccessGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
