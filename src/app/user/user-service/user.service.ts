import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User, UserCredentials } from '../models/user.model';
import { loginUrl, signupUrl } from '../../core/supabase.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private sessionExpiryTimeOut = 0;
  currentUser: User | null = null;
  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
      const expirationDate = new Date(this.currentUser!.expiresAt);
      this.setSessionExpiryTimeOut(expirationDate.getTime());
    }
  }

  login(user: UserCredentials) {
    return this.http.post(loginUrl, user);
  }

  signup(user: UserCredentials) {
    return this.http.post(signupUrl, user);
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.setSessionExpiryTimeOut(user.expiresAt);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    clearTimeout(this.sessionExpiryTimeOut);
    this.router.navigate(['/users/login']);
  }

  private setSessionExpiryTimeOut(expiresAt: number) {
    clearTimeout(this.sessionExpiryTimeOut);
    const now = new Date().getTime();
    const timeout = expiresAt * 1000 - now;
    this.sessionExpiryTimeOut = setTimeout(() => {
      this.logout();
    }, timeout) as unknown as number;
  }
}
