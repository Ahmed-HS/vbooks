import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { inject } from '@angular/core';

export function authGuard() {
  const userService = inject(UserService);
  if (userService.currentUser) return true;
  const router = inject(Router);
  return router.parseUrl('/users/login');
}
