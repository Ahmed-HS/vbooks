import { TestBed } from '@angular/core/testing';
import { authInterceptor } from './auth.interceptor';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
describe('AuthInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
  });

  it('auth interceptor should add apikey to the request', async () => {
    const httpClient = TestBed.inject(HttpClient)
    const requestPromise = firstValueFrom(httpClient.get('https://localhost:3000/'));
    const httpController = TestBed.inject(HttpTestingController);
    const req = httpController.expectOne('https://localhost:3000/');
    expect(req.request.headers.has('apikey')).toBe(true);
    req.flush({});
    await requestPromise;
    httpController.verify();
  });
});
