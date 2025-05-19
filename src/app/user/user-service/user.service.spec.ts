import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  let userService: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });
    localStorage.clear();
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should set current user and store in localStorage', () => {
    const user = {
      id: 1,
      email: 'Ahmed@gmail.com',
      accessToken: 'accessToken',
      expiresAt: 1234567890,
    };
    userService.setCurrentUser(user);
    expect(userService.currentUser).toEqual(user);
    const localStorageUser = localStorage.getItem('user');
    expect(localStorageUser).toEqual(JSON.stringify(user));
  });

  it('set current user should set session expiry timeout', () => {
    const user = {
      id: 1,
      email: 'Ahmed@gmail.com',
      accessToken: 'accessToken',
      expiresAt: 1234567890,
    };
    const setTimeoutSpy = spyOn(window, 'setTimeout');
    userService.setCurrentUser(user);
    expect(setTimeoutSpy).toHaveBeenCalled();
  });

  it('login should call httpClient.post with correct URL and user credentials', () => {
    const userCredentials = {
      email: 'Ahmed@gmail.com',
      password: '123456',
    };
    const loginUrl =
      'https://katuhqknilkfzuhicoxj.supabase.co/auth/v1/token?grant_type=password';
    userService.login(userCredentials);
    expect(httpClientSpy.post).toHaveBeenCalledWith(loginUrl, userCredentials);
  });

  it('signup should call httpClient.post with correct URL and user credentials', () => {
    const userCredentials = {
      email: 'Ahmed@gmail.com',
      password: '123456',
    };
    const signupUrl = 'https://katuhqknilkfzuhicoxj.supabase.co/auth/v1/signup';
    userService.signup(userCredentials);
    expect(httpClientSpy.post).toHaveBeenCalledWith(signupUrl, userCredentials);
  });

  it('logout should clear current user and localStorage', () => {
    const user = {
      id: 1,
      email: 'Ahmed@gmail.com',
      accessToken: 'accessToken',
      expiresAt: 1234567890,
    };
    userService.setCurrentUser(user);
    userService.logout();
    expect(userService.currentUser).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('logout should navigate to login page', () => {
    userService.logout();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users/login']);
  });

  it('user should be null at the beginning', () => {
    expect(userService.currentUser).toBeNull();
  });
});
