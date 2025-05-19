import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { UserService } from '../../user/user-service/user.service';
import { BookService } from '../book-service/book.service';
import { of } from 'rxjs';
import { SearchBooksComponent } from '../search-books/search-books.component';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { BookCardComponent } from '../book-card/book-card.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingHarness } from '@angular/router/testing';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { By } from '@angular/platform-browser';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let routerTestingHarness: RouterTestingHarness;
  const sampleBook = {
    id: 1,
    title: 'Book Title',
    description: 'Book Description',
    author: 'Book Author',
    publicationDate: new Date(),
    publishedBy: 'Book Publisher',
    rating: 4.5,
    pageCount: 250,
    category: 'Fiction',
    imgUrl: 'http://example.com/image.jpg',
  };
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', [], {
      // Mock property with getter
      get currentUser() {
        return {
          id: 1,
          email: 'Ahmed@gmail.com',
          accessToken: 'accessToken',
          expiresAt: 1746537870734,
        };
      },
    });
    bookServiceSpy = jasmine.createSpyObj('BookService', [
      'getAllBooks',
      'getFilteredBooks',
      'searchBooks',
      'addBook',
      'updateBook',
      'deleteBook',
    ]);
    bookServiceSpy.getFilteredBooks.and.returnValue(of([sampleBook]));
    bookServiceSpy.searchBooks.and.stub();
    await TestBed.configureTestingModule({
      imports: [RouterLink, FormsModule],
      declarations: [
        BookListComponent,
        SearchBooksComponent,
        BookCardComponent,
      ],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceSpy,
        },
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
        provideRouter([
          { path: 'books', component: BookListComponent },
          { path: 'books/:id', component: BookDetailsComponent },
        ]),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(BookListComponent);
    routerTestingHarness = await RouterTestingHarness.create();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('one book should be displayed', () => {
    const bookElements = fixture.nativeElement.querySelectorAll(
      '[data-test-id="book-card"]'
    );
    expect(bookElements.length).toBe(1);
    expect(bookElements[0].textContent).toContain('Book Title');
  });

  it('clicking the book card should navigate to the book details page', fakeAsync(async () => {
    await routerTestingHarness.navigateByUrl('/books', BookListComponent);
    const cardElement = routerTestingHarness.routeDebugElement!.query(
      By.css('[data-test-id="book-card"]')
    );
    cardElement.triggerEventHandler('click', {
      button: 0,
    });
    tick();
    expect(TestBed.inject(Router).url).toBe('/books/1');
  }));
});
