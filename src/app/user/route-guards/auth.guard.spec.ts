import { TestBed } from '@angular/core/testing';
import { UserService } from '../user-service/user.service';
import { authGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let userServiceSpy: jasmine.SpyObj<UserService>;
  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['currentUser']);
    userServiceSpy.currentUser = null; // Mock the currentUser property
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
      ],
    });
  });

  it('Auth rotue guard should redirect to login if user is not logged in', () => {
    TestBed.runInInjectionContext(() => {
      const reuslt = authGuard();
      const expectedUrl = TestBed.inject(Router).parseUrl('/users/login');
      expect(reuslt).toEqual(expectedUrl);
    });
  });

  it('Auth rotue guard should allow access if user is logged in', () => {
    userServiceSpy.currentUser = {
      id: 1,
      email: 'Ahmed@gmail.com',
      accessToken: 'accessToken',
      expiresAt: 1746537870734,
    };
    TestBed.runInInjectionContext(() => {
      const result = authGuard();
      expect(result).toBe(true);
    });
  });
});
