import { TestBed } from '@angular/core/testing';

import { GloginGuard } from './glogin.guard';

describe('GloginGuard', () => {
  let guard: GloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
