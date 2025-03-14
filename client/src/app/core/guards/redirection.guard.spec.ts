import { TestBed } from '@angular/core/testing';

import { RedirectionGuard } from './redirection.guard';

describe('RedirectionGuard', () => {
  let guard: RedirectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
