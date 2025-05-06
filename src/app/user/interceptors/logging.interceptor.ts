import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs';

export function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  return next(request).pipe(
    tap((event) => {
      console.log(`${request.url} Response`, event);
    })
  );
}
