import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailsComponent } from './book-details.component';
import { BookService } from '../book-service/book.service';
import { of } from 'rxjs';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
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
    bookServiceSpy = jasmine.createSpyObj('BookService', [
      'getAllBooks',
      'getFilteredBooks',
      'addBook',
      'updateBook',
      'deleteBook',
    ]);
    await TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceSpy,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(BookDetailsComponent);
    fixture.componentRef.setInput('book', sampleBook);
    component = fixture.componentInstance;
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

  it('delete book should call the bookService deleteBook method', () => {
    component.onDeleteBook();
    expect(bookServiceSpy.deleteBook).toHaveBeenCalledWith(sampleBook);
  });
});
