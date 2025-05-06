import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { UserService } from '../../user/user.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

describe('BookService', () => {
  let bookService: BookService;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    // Create spy object for UserService
    const userSpy = jasmine.createSpyObj('UserService', [], {
      // Mock property with getter
      get currentUser() {
        return {
          id: 1,
          email: 'Test@gmail.com',
          accessToken: 'asdflkh2918h',
          expiresAt: 1746537870734,
        };
      },
    });

    TestBed.configureTestingModule({
      providers: [
        BookService,
        { provide: UserService, useValue: userSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    // Get instances
    bookService = TestBed.inject(BookService);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(bookService).toBeTruthy();
  });

  it('getAllBooks should call http.get with correct URL containing the user id ', async () => {
    const books$ = bookService.getAllBooks();
    const allBooks = firstValueFrom(books$);
    const supabaseBooksListUrl =
      'https://katuhqknilkfzuhicoxj.supabase.co/rest/v1/books?select=*&user_id=eq.1';
    const req = httpTestingController.expectOne(
      {
        method: 'GET',
        url: supabaseBooksListUrl,
      },
      'Request to load all books'
    );
    req.flush([]);
    expect(await allBooks).toEqual([]);
    httpTestingController.verify();
  });
});
