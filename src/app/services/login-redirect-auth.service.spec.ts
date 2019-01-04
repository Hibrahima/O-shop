import { TestBed } from '@angular/core/testing';
import { LoginRedirectAuthGuard } from './login-redirect-auth.service';

describe('LoginAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginRedirectAuthGuard = TestBed.get(LoginRedirectAuthGuard);
    expect(service).toBeTruthy();
  });
});
