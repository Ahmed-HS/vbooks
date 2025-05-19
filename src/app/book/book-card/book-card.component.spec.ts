import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCardComponent } from './book-card.component';
import { provideRouter, RouterLink } from '@angular/router';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { BookListComponent } from '../book-list/book-list.component';
import { UserService } from '../../user/user-service/user.service';
import { BookService } from '../book-service/book.service';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
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
      'addBook',
      'updateBook',
      'deleteBook',
    ]);
    await TestBed.configureTestingModule({
      imports: [RouterLink],
      declarations: [BookCardComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceSpy,
        },
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
        provideRouter([]),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('book', sampleBook);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('book title should be displayed', () => {
    const titleElement = fixture.nativeElement.querySelector(
      '[data-test-id="book-title"]'
    );
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Book Title');
  });
});
