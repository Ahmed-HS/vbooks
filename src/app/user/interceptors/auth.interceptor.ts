import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { UserService } from '../user-service/user.service';
import { inject } from '@angular/core';
import { supabaseApiKey } from '../../core/supabase.config';

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  let newHeaders = request.headers.append('apikey', supabaseApiKey);
  const currentUser = inject(UserService).currentUser;
  if (currentUser) {
    newHeaders = newHeaders.append(
      'Authorization',
      `Bearer ${currentUser.accessToken}`
    );
  }
  const requestWithAuth = request.clone({
    headers: newHeaders,
  });
  return next(requestWithAuth);
}
