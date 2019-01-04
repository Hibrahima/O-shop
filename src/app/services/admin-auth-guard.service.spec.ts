import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from "./AdminAuthGuard";

describe('AdminGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAuthGuard = TestBed.get(AdminAuthGuard);
    expect(service).toBeTruthy();
  });
});
